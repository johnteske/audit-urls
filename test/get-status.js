const test = require("tape-promise/tape");
const { default: getStatus } = require("../dist");
const { urls } = require("./data");

test("200", async (t) => {
  const res = await getStatus(urls.ok);
  t.equal(res.status, 200);
});

test("https is available", async (t) => {
  const res = await getStatus(urls.https);
  t.equal(res.status, 200);
  t.equal(res.https, "available");
});

test("404", async (t) => {
  const res = await getStatus(urls.notFound);
  t.equal(res.status, 404);
});

test("no response", async (t) => {
  const res = await getStatus(urls.error);
  t.assert(res.error != null);
});

test("invalid url", async (t) => {
  const res = await getStatus(urls.invalid);
  t.equal(res.error, "ERR_INVALID_URL");
});
