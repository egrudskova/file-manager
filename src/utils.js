import {CLI_COMMANDS, FS_COMMANDS, NWD_COMMANDS, OS_COMMANDS, ZIP_COMMANDS} from "./commands/commands.js";
import {fsCommandsHandler} from "./commands/fsCommandsHandler.js";
import {nwdCommandsHandler} from "./commands/nwdCommandsHandler.js";
import {osCommandsHandler} from "./commands/osCommandsHandler.js";
import {zipCommandsHandler} from "./commands/zipCommandsHandler.js";
import {hashCommandsHandler} from "./commands/hashCommandsHandler.js";

export const printCurrentWorkingDirectory = (dir) => {
  console.log(`You are currently in ${dir}`);
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

const isCommandIn = (obj, command) => Object.values(obj).includes(command);

const parseCommand = (line) => {
  const command = {};
  const processedLine = line.trim().split(' ');
  const name = isCommandIn(CLI_COMMANDS, processedLine[0]) ? processedLine[0] : null;
  command['args'] = [];
  processedLine.slice(1).forEach((arg) => {
    command['args'].push(arg);
  })
  if (!name) {
    throw new Error('Invalid input');
  }
  return { name, ...command };
}

const executeCommand = async ({name, args}, { closeApp }) => {
  if (isCommandIn(FS_COMMANDS, name)) {
    await fsCommandsHandler(name, ...args);
    return;
  } else if (isCommandIn(NWD_COMMANDS, name)) {
    nwdCommandsHandler(name, ...args);
    return;
  } else if (isCommandIn(ZIP_COMMANDS, name)) {
    await zipCommandsHandler(name, ...args);
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
      closeApp();
      break;
    default:
      console.log('Invalid input');
  }
}

export const processCommand = async (line, options) => {
  try {
    await executeCommand(parseCommand(line), options);
  } catch (err) {
    console.log(err.message)
  }
}
