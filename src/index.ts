import got from "got";

type Url = string;

enum Https {
  Available = "available",
  NotAvailable = "no",
}

export type LinkStatus = {
  url: Url;
  error?: string;
  status?: number;
  redirect?: string[];
  https?: Https;
};

const options = {
  timeout: 3000,
  retry: 0,
};

export default async function getStatus(url: Url): Promise<LinkStatus> {
  let response;
  try {
    response = await got(url, options);
  } catch (err) {
    return {
      url,
      error: err.response == null ? err.code : null,
      status: err.response?.statusCode,
    };
  }

  let https = null;
  if (!url.startsWith("https")) {
    https = await got(url.replace("http://", "https://"), options)
      .then(() => Https.Available)
      .catch(() => Https.NotAvailable);
  }

  return {
    url,
    status: response.statusCode,
    redirect: response.redirectUrls.length !== 0 ? response.redirectUrls : null,
    https,
  };
}

export const getAllStatuses = (links: Url[]): Promise<LinkStatus[]> =>
  Promise.all(links.map(getStatus));
