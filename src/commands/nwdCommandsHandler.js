import {NWD_COMMANDS} from "./commands.js";
import { normalize, dirname } from 'path';
import {chdir, cwd} from 'node:process'

const changeDirectory = (...args) => {
  if (args.length !== 1) {
    throw new Error('Invalid input');
  }
  try {
    const [destFolder] = args;
    const destPath = normalize(destFolder);
    chdir(destPath);
  } catch {
    throw new Error('Operation failed');
  }
}

const goFolderUp = () => {
  changeDirectory(dirname(cwd()));
}

export const nwdCommandsHandler = (name, ...args) => {
  switch (name) {
    case NWD_COMMANDS.cd:
      changeDirectory(...args);
      break;
    case NWD_COMMANDS.up:
      goFolderUp();
      break;
    case NWD_COMMANDS.ls:
      console.log('NOT IMPLEMENTED');
      break;
    default:
      console.log('Invalid input');
  }
}
