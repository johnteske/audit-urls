const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
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

fs.writeFileSync(path.resolve(__dirname, "data.txt"), Object.values(urls).join("\n"), {
  encoding: "utf8",
});

test("uses file with 1 or more args", async (t) => {
  t.plan(2);
  exec(`${CLI} test/data.txt test/data.txt`, (err, stdout, stderr) => {
    t.error(err, "err");
    t.error(stderr, "stderr");
    t.end();
  });
});
