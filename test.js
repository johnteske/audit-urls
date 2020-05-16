const test = require("tape-promise/tape");

const { getStatus } = require("./dist/checker");

test("200", async (t) => {
  const res = await getStatus("https://johnteskemusic.com");
  t.equal(res.status, 200)
})

test("https is available", async (t) => {
  const res = await getStatus("http://johnteskemusic.com");
  t.equal(res.status, 200)
  t.equal(res.https, "available")
})

test("404", async (t) => {
  const res = await getStatus("https://johnteskemusic.com/about.php");
  t.equal(res.status, 404)
})

test("no response", async (t) => {
  const res = await getStatus("https://hopefully-not-a-real-site.com");
  t.assert(res.error != null)
})

test("invalid url", async (t) => {
  const res = await getStatus("invalid url");
  t.equal(res.error, "ERR_INVALID_URL")
})
