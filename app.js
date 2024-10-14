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

  const closeApp = () => { rl.close() };

  rl.on('line', async (line) => {
    await processCommand(line, closeApp);
    //printCurrentWorkingDirectory();
  });

  rl.on('close', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`)
  })
};

initApp()
