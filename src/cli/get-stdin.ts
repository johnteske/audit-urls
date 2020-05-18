import { getAllStatuses } from "../index";
import format from "./format";

async function getStdin(): Promise<string> {
  let data = "";
  process.stdin.setEncoding("utf8");

  for await (const chunk of process.stdin) {
    data += chunk;
  }

  return data;
}

export async function getIt(filterFn): Promise<void> {
  const stdin = await getStdin();
  const links = stdin.split(/\s/).filter(Boolean);
  await getAllStatuses(links).then((statuses) => {
    statuses
      .filter(filterFn)
      .map(format)
      .forEach((v) => {
        console.log(v);
      });
  });
}
