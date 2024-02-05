import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { username } from './src/username.js';
import { printCWD } from './src/utils/navigator.js';
import { processInput } from './src/input-processing.js';
import { blue, yellow } from './src/utils/logger.js';

console.log(`${blue('Welcome to the File Manager, ')}${yellow(username)}${blue('!')}`);
printCWD();

const rl = createInterface({ input, output });

rl.on('line', async line => {
  await processInput(line.trim())
    ? printCWD()
    : rl.close()
})

rl.on('close', () => {
  console.log(`${blue('Thank you for using File Manager, ')}${yellow(username)}${blue(', goodbye!')}`);
})