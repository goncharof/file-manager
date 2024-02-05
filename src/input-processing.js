import { II, ERROR_COLOR } from "./constants/error.js"
import { ls, add, rn, cp } from "./utils/fs.js";
import { navUp, cd } from "./utils/navigator.js"
import { osProcessing } from "./utils/os-processing.js";

export const processInput = async (command) => {
  console.log(`Command: ${command}`);
  switch (command) {
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
    case command.startsWith('cp '):
      await cp(command.slice(3));
      break;
    case command.startsWith('mv '):
      await cp(command.slice(3));  
      break;
    case command.startsWith('rm '):
      await rm(command.slice(3));
      break; 
    case command.startsWith('os '):      
      osProcessing(command.slice(3));
      break;
    default:
      console.error(ERROR_COLOR, II)
  }

  return true;
}