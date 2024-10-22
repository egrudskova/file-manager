import {ZIP_COMMANDS} from "./commands.js";
import * as path from "node:path";
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs'

export const zipCommandsHandler = async (name, ...args) => {
  if (args.length < 2) {
    throw new Error('Invalid input');
  }
  try {
    const [srcFilename, destFilename] = args;
    const srcPath = path.resolve(process.cwd(), srcFilename);
    const destPath = path.resolve(process.cwd(), destFilename);
    const gzip = name === ZIP_COMMANDS.compress ? createBrotliCompress() : createBrotliDecompress();
    await pipeline(createReadStream(srcPath), gzip, createWriteStream(destPath));
  } catch {
    throw new Error('Operation failed');
  }
}
