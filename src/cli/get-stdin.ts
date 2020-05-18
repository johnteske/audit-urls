import { getAllStatuses, LinkStatus } from "../index";

async function getStdin(): Promise<string> {
  let data = "";
  process.stdin.setEncoding("utf8");

  for await (const chunk of process.stdin) {
    data += chunk;
  }

  return data;
}

export async function getIt(): Promise<LinkStatus[]> {
  const stdin = await getStdin();
  const links = stdin.split(/\s/).filter(Boolean);
  return getAllStatuses(links);
}
