import {OS_COMMANDS} from "./commands.js";
import { homedir, EOL, userInfo, cpus, arch } from 'node:os';

const printEOL = () => { console.log(`EOL: ${JSON.stringify(EOL)}`) };
const printHomeDir = () => { console.log(`Home directory: ${homedir()}`) };
const printUsername = () => { console.log(`Username: ${userInfo().username}`) };
const printArch = () => { console.log(`Username: ${arch()}`) };

const printCPUsInfo = () => {
  const cpusInfo = cpus().map(({ model, speed}, index) => `${index + 1}. ${ model } ${ speed }`);
  console.log(`CPUs number: ${cpus().length}`);
  console.log(`CPUs data:\n${cpusInfo.join('\n')}`);

}

export const osCommandsHandler = (...args) => {
  const commandArg = args[0];
  switch (commandArg) {
    case OS_COMMANDS.EOL:
      printEOL();
      break;
    case OS_COMMANDS.CPUs:
      printCPUsInfo();
      break;
    case OS_COMMANDS.homedir:
      printHomeDir();
      break;
    case OS_COMMANDS.username:
      printUsername();
      break;
    case OS_COMMANDS.architecture:
      printArch();
      break;
    default:
      console.log('Invalid input');
  }
}
