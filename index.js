#!/usr/bin/env node
const getStdin = require("./get-stdin");
const checker = require("./checker");

(async () => {
  const stdin = await getStdin();
  const links = stdin.split(/\s/).filter(Boolean);
  await checker(links);
})();
