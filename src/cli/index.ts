#!/usr/bin/env node
import { program } from "commander";
const { name, version } = require("../../package.json");
import * as filter from "../filter";
import { getIt } from "./get-stdin";

program
  .name(name)
  .version(version)
  .description("Get url status(es) and print on the standard output")
  .option("-v, --verbose", "display all url statuses")
  .on("--help", () => {
    console.log("\nExample:");
    console.log('  echo "https://johnteskemusic.com invalid_url | audit-urls"');
  })
  .parse(process.argv);

const files = program.args;

let inputMethod: "stdin" | "file";
switch (files.length) {
  case 0:
    inputMethod = "stdin";
    break;
  case 1:
    inputMethod = files[0] === "-" ? "stdin" : "file";
    break;
  default:
    inputMethod = "file";
}

if (inputMethod === "file") {
  console.error("not yet supported");
  process.exit(1);
}

const filterResults = program.verbose ? filter.none : filter.notOk;

(async () => {
  await getIt(filterResults);
})();
