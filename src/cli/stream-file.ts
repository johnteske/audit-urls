import * as fs from "fs";
import { Readable } from "stream";
import { getAllStatuses, LinkStatus } from "../index";

function read(filename): Readable {
  return fs
    .createReadStream(filename, { encoding: "utf8" })
    .on("error", (err) => {
      throw err;
    });
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
