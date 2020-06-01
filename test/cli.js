const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const test = require("tape-promise/tape");
const { urls } = require("./data");

const CLI = "node dist/cli/index.js";

const testOk = (cmd) => (t) => {
  t.plan(2);
  exec(cmd, (err, stdout, stderr) => {
    t.error(err, "err");
    t.error(stderr, "stderr");
    t.end();
  });
};

const testErr = (cmd) => (t) => {
  t.plan(2);
  exec(cmd, (err, stdout, stderr) => {
    t.assert(err, t.name + ">err");
    t.assert(stderr, t.name + ">stderr");
    t.end();
  });
};

test("uses stdin with 0 args", (t) => {
  t.plan(2);
  t.test(t.name + ">ok", testOk(`echo ${urls.ok} | ${CLI}`));
  t.test(t.name + ">err", testErr(`echo ${urls.invalid} | ${CLI}`));
});

test("uses stdin with '-' arg", (t) => {
  t.plan(2);
  t.test(t.name + ">ok", testOk(`echo ${urls.ok} | ${CLI} -`));
  t.test(t.name + ">err", testErr(`echo ${urls.invalid} | ${CLI} -`));
});

fs.writeFileSync(
  path.resolve(__dirname, "all.txt"),
  Object.values(urls).join("\n"),
  {
    encoding: "utf8",
  }
);
fs.writeFileSync(path.resolve(__dirname, "ok.txt"), urls.ok, {
  encoding: "utf8",
});

test("uses file with 1 or more args", (t) => {
  t.plan(3);
  t.test(t.name + ">ok", testOk(`${CLI} test/ok.txt`));
  t.test(t.name + ">notOk", testErr(`${CLI} test/ok.txt test/all.txt`));
  t.test(t.name + ">invalid", testErr(`${CLI} test/ok.txt test/invalid.txt`));
});
