import process, {chdir, cwd} from 'node:process';
import readlinePromises from 'node:readline/promises';
import {processCommand, printCurrentWorkingDirectory, readUserName} from "./src/utils.js";
import {homedir} from "node:os";

const initApp = () => {
  try {
    const username = readUserName() ?? 'unknown';
    chdir(homedir());
    console.log(`Welcome to the File Manager, ${username}`);
    printCurrentWorkingDirectory(cwd());

    const rl = readlinePromises.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const closeApp = () => { rl.close() };

    rl.on('line', async (line) => {
      await processCommand(line, { closeApp });
      printCurrentWorkingDirectory(cwd());
    });

    rl.on('close', () => {
      console.log(`Thank you for using File Manager, ${username}, goodbye!`)
    })
  } catch (err) {
    console.log(err.message);
  }

};

initApp()
