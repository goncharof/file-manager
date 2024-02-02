import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { username } from './src/username.js';
import { printCWD } from './src/navigator.js';
import { processInput } from './src/input-processing.js';

console.log(`Welcome to the File Manager, ${username}!`);
printCWD();

const rl = createInterface({ input, output });

rl.on('line', line => {
  processInput(line.trim())
  printCWD()
})

rl.on('close', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
})