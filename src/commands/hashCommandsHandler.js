import path from "node:path";
import {createReadStream} from "node:fs";
import {createHash} from "node:crypto";

export const hashCommandsHandler = (...args) => {
  if (args.length !== 1) {
    throw new Error('Invalid input');
  }
  try {
    const [fileName] = args;
    const filePath = path.resolve(process.cwd(), fileName);
    const readStream = createReadStream(filePath);
    const hash = createHash('sha256');

    readStream.pipe(hash).on('finish', () => {
      console.log(hash.digest("hex"));
    })
  } catch {
    throw new Error('Operation failed');
  }
}
