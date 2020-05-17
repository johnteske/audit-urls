#!/usr/bin/env node
import { program } from "commander";
import * as filter from "./filter";
import getStdin from "./get-stdin";
import { getAllStatuses, LinkStatus } from "./index";

const { name, version } = require("../package.json");

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

const filterResults = program.verbose ? filter.none : filter.notOk;

function formatStatus(v: LinkStatus) {
  const { url } = v;
  const msgs = ["error", "status", "https", "redirect"]
    .filter((key) => v[key] != null)
    .map((key) =>
      key === "redirect"
        ? v.redirect.map((r) => `redirect: ${r}`).join("\n\t")
        : `${key}: ${v[key]}`
    );
  console.log([url, ...msgs].join("\n\t"));
}

(async () => {
  const stdin = await getStdin();
  const links = stdin.split(/\s/).filter(Boolean);
  await getAllStatuses(links).then((statuses) => {
    statuses.filter(filterResults).forEach(formatStatus);
  });
})();
