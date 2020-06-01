import * as fs from "fs";
import { Readable } from "stream";
import { getAllStatuses, LinkStatus } from "../index";

type Filename = string;

function read(filename: Filename): Readable {
  return fs
    .createReadStream(filename, { encoding: "utf8" })
    .on("error", (err) => {
      console.error(err.message);
      process.exit(1);
    });
}

async function getFile(readable: Readable): Promise<string> {
  let data = "";

  for await (const chunk of readable) {
    data += chunk;
  }

  return data;
}

export default async function (files: Filename[]): Promise<LinkStatus[]> {
  const links: string[][] = await Promise.all(
    files.map(
      async (f): Promise<string[]> => {
        const stream = read(f);
        const file = await getFile(stream);
        return file.split(/\n/).filter(Boolean);
      }
    )
  );

  return getAllStatuses([].concat(...links));
}
