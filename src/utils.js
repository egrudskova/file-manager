import process from "node:process";
import {CLI_COMMANDS, FS_COMMANDS, NWD_COMMANDS, OS_COMMANDS, ZIP_COMMANDS} from "./commands/commands.js";
import {fsCommandsHandler} from "./commands/fsCommandsHandler.js";
import {nwdCommandsHandler} from "./commands/nwdCommandsHandler.js";
import {osCommandsHandler} from "./commands/osCommandsHandler.js";
import {zipCommandsHandler} from "./commands/zipCommandsHandler.js";
import {hashCommandsHandler} from "./commands/hashCommandsHandler.js";

export const printCurrentWorkingDirectory = () => {
  console.log(`You are currently in ${process.cwd()}`);
};

export const readUserName = () => {
  try {
    const usernameArgs = process.argv[2];
    let username;
    if (usernameArgs?.startsWith('--username') && usernameArgs?.includes('=')) {
      username = usernameArgs.split('=')[1];
    } else {
      throw new Error('Invalid input');
    }
    return username;
  } catch (err) {
    console.log(err.message);
  }
}

const parseCommand = (line) => {
  const command = {};
  const name = CLI_COMMANDS[line.split(' ')[0]];
  command['args'] = [];
  line.split(' ').slice(1).forEach((arg) => {
    command['args'].push(arg);
  })
  if (!name) {
    throw new Error('Invalid input');
  }
  return { name, ...command };
}

const isCommandIn = (obj, command) => Object.values(obj).includes(command);

const executeCommand = ({name, args}) => {
  if (isCommandIn(FS_COMMANDS, name)) {
    fsCommandsHandler(name, ...args);
    return;
  } else if (isCommandIn(NWD_COMMANDS, name)) {
    nwdCommandsHandler(name, ...args);
    return;
  } else if (isCommandIn(ZIP_COMMANDS, name)) {
    zipCommandsHandler(name, ...args);
    return;
  }
  switch (name) {
    case CLI_COMMANDS.os:
      osCommandsHandler(...args);
      break;
    case CLI_COMMANDS.hash:
      hashCommandsHandler(...args);
      break;
    case CLI_COMMANDS.exit:
      break;
    default:
      console.log('Invalid input');
  }
}

export const processCommand = (line) => {
  try {
    executeCommand(parseCommand(line));
  } catch (err) {
    console.log(err.message)
  }
}
