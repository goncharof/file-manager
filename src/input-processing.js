import { II } from "./constants/error.js"
import { ls, add, rn, cp, cat, rm } from "./utils/fs.js";
import { navUp, cd } from "./utils/navigator.js"
import { osProcessing } from "./utils/os.js";
import { red } from "./utils/logger.js";
import { calculateHash } from "./utils/hash.js";
import { compress, decompress } from './utils/zip.js';

export const printHelp = () => {
  console.table([
    { command: '.help', description: 'Print help' },
    { command: '.exit', description: 'Exit' },
    { command: 'up', description: 'Go up' },
    { command: 'ls', description: 'List files' },
    { command: 'cat', description: 'Print file content', params: '<path_to_file>' },
    { command: 'cd', description: 'Change directory', params: '<path_to_directory>' },
    { command: 'add', description: 'Add new file', params: '<new_file_name>' },
    { command: 'rn', description: 'Rename file', params: '<path_to_file> <new_filename>' },
    { command: 'cp', description: 'Copy file', params: '<path_to_file> <path_to_new_directory>' },
    { command: 'mv', description: 'Move file', params: '<path_to_file> <path_to_new_directory>' },
    { command: 'rm', description: 'Remove file', params: '<path_to_file>' },
    { command: 'os', description: 'Print OS info', params: '<--EOL --cpus --homedir --username --architecture>' },
    { command: 'hash', description: 'Calculate hash', params: '<path_to_file> <path_to_destination>' },
    { command: 'compress', description: 'Compress file', params: '<path_to_file> <path_to_destination>' },
    { command: 'decompress', description: 'Decompress file', params: '<path_to_file> <path_to_destination>' }
  ]);
}
printHelp();

export const processInput = async (command) => {
  switch (command) {
    case '':
      return true;
    case '.help':
      printHelp();
      return true;
    case '.exit':
      return false;
    case 'up':
      navUp();
      return true;
    case 'ls':
      await ls();
      return true;
  }
  
  switch (true) {
    case command.startsWith('cd '):
      cd(command.slice(3));
      break;
    case command.startsWith('add '):
      await add(command.slice(4));
      break;
    case command.startsWith('rn '):
      await rn(command.slice(3));
      break;
    case command.startsWith('mv '):
      await rn(command.slice(3), true);
      break;  
    case command.startsWith('cp '):
      await cp(command.slice(3));
      break;
    case command.startsWith('rm '):
      await rm(command.slice(3));
      break; 
    case command.startsWith('os '):      
      osProcessing(command.slice(3));
      break;
    case command.startsWith('hash '):  
      await calculateHash(command.slice(5));
      break;
    case command.startsWith('compress '):
      await compress(command.slice(9));
      break;
    case command.startsWith('decompress '):  
      await decompress(command.slice(11));
      break;
    case command.startsWith('cat '):
      await cat(command.slice(4));
      break;
    default:
      console.error(red(II))
  }

  return true;
}