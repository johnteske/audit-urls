import { LinkStatus } from "./index";

export const none = (): true => true;

export const notOk = (v: LinkStatus): boolean =>
  v.status !== 200 ||
  v.redirect != null ||
  v.https === "available" ||
  v.error != null;
