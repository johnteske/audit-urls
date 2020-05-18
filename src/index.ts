import got from "got";

export type LinkStatus = {
  url: string;
  error?: string;
  status?: number;
  redirect?: string[];
  https?: "available" | "no";
};

const options = {
  timeout: 3000,
  retry: 0,
};

export default async function getStatus(url): Promise<LinkStatus> {
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

export const getAllStatuses = (links): Promise<LinkStatus[]> => Promise.all(links.map(getStatus));
