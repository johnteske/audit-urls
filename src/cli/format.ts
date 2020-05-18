import { LinkStatus } from "../index";

const DELIMITER = "\n\t";

const formatKey = (key, value) => `${key}: ${value}`;
const formatRedirect = (redirects) =>
  redirects.map((r) => `redirect: ${r}`).join(DELIMITER);

export default function format(v: LinkStatus) {
  const msgs = ["error", "status", "https", "redirect"]
    .filter((key) => v[key] != null)
    .map((key) =>
      key === "redirect" ? formatRedirect(v.redirect) : formatKey(key, v[key])
    );
  return [v.url, ...msgs].join(DELIMITER);
}
