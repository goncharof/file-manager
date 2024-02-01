import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { username } from './src/username.js';

console.log(`Welcome to the File Manager, ${username}!`);

const rl = createInterface({ input, output });

rl.on('line', line => {
  console.log(`You entered: ${line}`);
})

rl.on('close', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
})