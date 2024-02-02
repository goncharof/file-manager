import { II } from "./constants/error.js"
import { ls, add } from "./fs.js";
import { navUp, cd } from "./navigator.js"

export const processInput = async (command) => {
  console.log(`Command: ${command}`);
  switch (true) {
    case 'up' === command:
      navUp();
      break;
    case command.startsWith('cd '):
      cd(command.slice(3));
      break;
    case 'ls' === command:
      await ls();
      break;
    case command.startsWith('add'):
      await add(command.slice(3));
      break;  
    default:
      console.log(II)
  }
}