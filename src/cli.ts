#!/usr/bin/env node
import { program } from "commander";
import * as filter from "./filter";
import getStdin from "./get-stdin";
import getStatus, { LinkStatus } from "./index";

const { name, version } = require("../package.json");
program
  .name(name)
  .version(version)
  .option("-v, --verbose", "display all url statuses");
program.parse(process.argv);

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
  await Promise.all(links.map(getStatus)).then((statuses) => {
    statuses.filter(filterResults).forEach(formatStatus);
  });
})();
