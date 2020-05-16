#!/usr/bin/env node
import getStdin from "./get-stdin";
import checker from "./checker";

(async () => {
  const stdin = await getStdin();
  const links = stdin.split(/\s/).filter(Boolean);
  await checker(links);
})();
