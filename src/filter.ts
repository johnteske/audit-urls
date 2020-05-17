import { LinkStatus } from "./index";

export const none = (v) => v;

export const notOk = (v: LinkStatus) =>
  v.status !== 200 ||
  v.redirect != null ||
  v.https === "available" ||
  v.error != null;
