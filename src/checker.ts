import got from "got"

const options = {
  timeout: 3000,
  retry: 0,
};

type LinkStatus = {
  url: string;
  error?: string;
  status?: number;
  redirect?: string[];
  https?: "available" | "no";
};

export async function getStatus(url) {
  const isHttps = url.startsWith("https");

  let response;
  try {
    response = await got(url, options);
  } catch (err) {
    const _error = err.response == null ? err.code : null;
    return {
      url,
      error: _error,
      status: err.response?.statusCode,
    };
  }

  let https = null;
  if (!isHttps) {
    https = await got(url.replace("http://", "https://"), options)
      .then(() => "available")
      .catch(() => "no");
  }

  return {
    url,
    status: response.statusCode,
    redirect: response.redirectUrls.length !== 0 ? response.redirectUrls : null,
    https,
  };
}

function formatStatus(v: LinkStatus) {
  const { url } = v;
  const msgs = ["error", "status", "https", "redirect"]
    .filter((key) => v[key] != null)
    .map((key) =>
      key === "redirect"
        ? v.redirect.map((r) => `redirect: ${r}`).join("\n\t")
        : `${key}: ${v[key]}`
    );
  console.log([url, ...msgs].join("\n\t"));
}

export default (links) =>
  Promise.all(links.map(getStatus)).then((statuses) => {
    statuses.forEach(formatStatus);
  });
