const got = require("got");

const isHttps = (url) => url.startsWith("https");

module.exports = (links) =>
  Promise.all(
    links.map(async (url) => {
      try {
        const response = await got(url, { timeout: 3000 });
        if (response == null) {
          throw { response: null };
        }
        return {
          status: response.statusCode,
          url,
        };
      } catch (error) {
        const { response } = error;
        if (response != null) {
          return { status: error.response.statusCode, url };
        } else {
          return { status: undefined, url };
        }
      }
    })
  ).then((values) => {
    values
      .filter((v) => v.status !== 200 || !isHttps(v.url))
      .forEach((v) => console.log(`${v.status} ${v.url}`));
  });
