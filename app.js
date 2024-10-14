import process from 'node:process';
import readlinePromises from 'node:readline/promises';
import {processCommand, printCurrentWorkingDirectory, readUserName} from "./src/utils.js";

const initApp = () => {
  const username = readUserName() ?? 'unknown';
  console.log(`Welcome to the File Manager, ${username}`);
  printCurrentWorkingDirectory();

  const rl = readlinePromises.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', (line) => {
      processCommand(line);
    //printCurrentWorkingDirectory();
  });

  rl.on('close', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`)
  })
};

initApp()