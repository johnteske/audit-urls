import { LinkStatus } from "./index";

export const none = (v) => v;

export const notOk = (v: LinkStatus) =>
  v.error != null || v.redirect != null || v.https === "available";
