import { LinkStatus } from "../index";

type StatusKey = keyof LinkStatus;

const DELIMITER = "\n\t";

const formatKey = (key: StatusKey, value: LinkStatus[typeof key]): string =>
  `${key}: ${value}`;
const formatRedirect = (redirects: LinkStatus["redirect"]): string =>
  redirects.map((r) => `redirect: ${r}`).join(DELIMITER);

const keys: StatusKey[] = ["error", "status", "https", "redirect"];

export default function format(v: LinkStatus): string {
  const msgs = keys
    .filter((key) => v[key] != null)
    .map((key) =>
      key === "redirect" ? formatRedirect(v.redirect) : formatKey(key, v[key])
    );
  return [v.url, ...msgs].join(DELIMITER);
}
