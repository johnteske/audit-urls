const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const test = require("tape-promise/tape");
const { urls } = require("./data");

const CLI = "node dist/cli/index.js";

const testOk = (t) => {
  t.plan(2);
  exec(`echo ${urls.ok} | ${CLI}`, (err, stdout, stderr) => {
    t.error(err, "err");
    t.error(stderr, "stderr");
    t.end();
  });
}

const testErr = (t) => {
  t.plan(2);
  exec(`echo ${urls.invalid} | ${CLI}`, (err, stdout, stderr) => {
    t.assert(err, "err"); // should it be this?
    t.error(stderr, "stderr"); // and should I be writing to stderr?
    t.end();
  });
}

test("uses stdin with 0 args", (t) => {
  t.plan(2)
  t.test("ok", (t2) => {
    t2.plan(2);
    exec(`echo ${urls.ok} | ${CLI}`, (err, stdout, stderr) => {
      t2.error(err, "err");
      t2.error(stderr, "stderr");
      t2.end();
    });
  });
  t.test("err", testErr)
});

test("uses stdin with '-' arg", (t) => {
  t.plan(2);
  exec(`echo ${urls.ok} | ${CLI} -`, (err, stdout, stderr) => {
    t.error(err, "err");
    t.error(stderr, "stderr");
    t.end();
  });
});

fs.writeFileSync(
  path.resolve(__dirname, "data.txt"),
  Object.values(urls).join("\n"),
  {
    encoding: "utf8",
  }
);

test("uses file with 1 or more args", (t) => {
  t.plan(2);
  exec(`${CLI} test/data.txt test/data.txt`, (err, stdout, stderr) => {
    t.error(err, "err");
    t.error(stderr, "stderr");
    t.end();
  });
});
