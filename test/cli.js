const { exec } = require("child_process");
const test = require("tape-promise/tape");
const { urls } = require("./data");

const CLI = "node dist/cli/index.js";

test("uses stdin with 0 args", async (t) => {
  t.plan(2);
  exec(`echo ${urls.invalid} | ${CLI}`, (err, stdout, stderr) => {
    t.error(err, "err");
    t.error(stderr, "stderr");
    t.end();
  });
});

test("uses stdin with '-' arg", async (t) => {
  t.plan(2);
  exec(`echo ${urls.invalid} | ${CLI} -`, (err, stdout, stderr) => {
    t.error(err, "err");
    t.error(stderr, "stderr");
    t.end();
  });
});

test.skip("uses file with 1 or more args", async (t) => {
  t.plan(2);
  exec(`${CLI} file1 file2`, (err, stdout, stderr) => {
    t.error(err, "err");
    t.error(stderr, "stderr");
    t.end();
  });
});
