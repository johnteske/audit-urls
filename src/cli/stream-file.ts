import * as fs from "fs";
import { getAllStatuses, LinkStatus } from "../index";

function read(filename) {
  return fs.createReadStream(filename, { encoding: "utf8" });
}

async function getFile(readable): Promise<string> {
  let data = "";

  for await (const chunk of readable) {
    data += chunk;
  }

  return data;
}

export async function getOne(files): Promise<LinkStatus[]> {
  const stream = read(files[0]); // TODO
  const file = await getFile(stream); // TODO
  const links = file.split(/\n/).filter(Boolean);
  return getAllStatuses(links);
}
