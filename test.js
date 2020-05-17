const test = require("tape-promise/tape");
const { exec } = require("child_process");

const { getStatus } = require("./dist");

const urls = {
  ok: "https://johnteskemusic.com",
  https: "http://johnteskemusic.com",
  notFound: "https://johnteskemusic.com/about.php",
  error: "https://hopefully-not-a-real-site.com",
  invalid: "invalid url",
};

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

test("command line output", (t) => {
  t.plan(1);
  const _urls = Object.values(urls).join(" ");
  exec(`echo ${_urls} | node dist/cli.js`, (_err, stdout) => {
    t.equal(
      stdout,
      "http://johnteskemusic.com\n\tstatus: 200\n\thttps: available\n\tredirect: https://johnteskemusic.com/\nhttps://hopefully-not-a-real-site.com\n\terror: ECONNREFUSED\ninvalid\n\terror: ERR_INVALID_URL\nurl\n\terror: ERR_INVALID_URL\n"
    );
    t.end();
  });
});
