import * as fs from "fs";

export async function getFile(readable) {
  let data = "";

  for await (const chunk of readable) {
    data += chunk;
  }

  return data;
}

export async function readAll(files) {
  //return Promise.all(files.map(getStatus));
}
