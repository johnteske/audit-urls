#!/usr/bin/env node
import { program } from "commander";
import * as fs from "fs";
import * as path from "path";
import * as filter from "../filter";
import format from "./format";
import getFiles from "./get-files";
import getStdin from "./get-stdin";

const { name, version } = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../../package.json"), "utf8")
);

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

const outputFilter = program.verbose ? filter.none : filter.notOk;
const inputFn = inputMethod === "stdin" ? getStdin : getFiles;

(async (): Promise<void> => {
  await inputFn(files).then((statuses) => {
    statuses
      .filter(outputFilter)
      .map(format)
      .forEach((v) => {
        console.log(v);
      });
  });
})();
