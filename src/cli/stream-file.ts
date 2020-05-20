import * as fs from "fs";
import { Readable } from "stream";
import { getAllStatuses, LinkStatus } from "../index";

type Filename = string;

function read(filename: Filename): Readable {
  return fs
    .createReadStream(filename, { encoding: "utf8" })
    .on("error", (err) => {
      throw err;
    });
}

async function getFile(readable: Readable): Promise<string> {
  let data = "";

  for await (const chunk of readable) {
    data += chunk;
  }

  return data;
}

export async function getOne(files: Filename[]): Promise<LinkStatus[]> {
  const links: string[] = await Promise.all(
    files.map(
      async (f): Promise<string> => {
        const stream = read(f);
        const file = await getFile(stream);
        return file;
        //return file.split(/\n/).filter(Boolean);
      }
    )
  ); //.then((ll) => ll.flat());
  const links2 = [].concat(...links);
  console.log(links2);
  return getAllStatuses([]);
  //return getAllStatuses(links);
}
