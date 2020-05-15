const got = require("got");

const options = {
  timeout: 3000,
  retry: 0,
};

module.exports = (links) =>
  Promise.all(
    links.map(async (url) => {
      const isHttps = url.startsWith("https");

      return got(url, options)
        .then((response) => {
          if (response == null) {
            throw { response: null, error: "no response" };
          }
          const { redirectUrls } = response;
          const redirect = redirectUrls.length !== 0 ? redirectUrls : null;
          return {
            status: response.statusCode,
            url,
            redirect,
          };
        })
        .then((response) => {
          if (isHttps) {
            return response;
          }
          return got(url.replace("http://", "https://"), options)
            .then(() => {
              return { ...response, https: "available" };
            })
            .catch(() => ({ ...response, https: "no" }));
        })
        .catch((err) => {
          const { response } = err;
          // should this match the above?
          if (response == null) {
            return { url };
          }
          return { status: err.response.statusCode, url };
        });
    })
  ).then((values) => {
    values.forEach((v) => {
      const { url } = v;
      const msgs = ["error", "https", "status", "redirect"]
        .filter((key) => v[key] != null)
        .map((key) =>
          key === "redirect"
            ? v.redirect.map((r) => `redirect: ${r}`).join("\n\t")
            : `${key}: ${v[key]}`
        );
      console.log([url, ...msgs].join("\n\t"));
    });
  });
