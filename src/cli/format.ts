import { LinkStatus } from "../index";

const DELIMITER = "\n\t";

const formatKey = (key, value): string => `${key}: ${value}`;
const formatRedirect = (redirects): string =>
  redirects.map((r) => `redirect: ${r}`).join(DELIMITER);

const keys = ["error", "status", "https", "redirect"];

export default function format(v: LinkStatus): string {
  const msgs = keys
    .filter((key) => v[key] != null)
    .map((key) =>
      key === "redirect" ? formatRedirect(v.redirect) : formatKey(key, v[key])
    );
  return [v.url, ...msgs].join(DELIMITER);
}
