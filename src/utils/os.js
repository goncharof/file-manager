import { EOL, arch, cpus, homedir, userInfo } from 'node:os';
import { ERROR_COLOR, II } from '../constants/error.js';
import { green } from './logger.js';

export const osProcessing = (arg) => {
  switch (arg) {
    case '--EOL':
      console.log((EOL));
      console.log(`EOL: ${green(JSON.stringify((EOL)))}`);
      break;
    case '--cpus':
      console.log(`overall amount of CPUS in the system: \x1b[34m${cpus().length}\x1b[0m`);
      console.table(cpus().map(({model, speed}) => ({ model, 'rate in GHz': speed / 1000 })), ['model', 'rate in GHz']);
      break;
    case '--homedir':
      console.log(`homedir: ${green(homedir())}`);
      break;
    case '--username':
      console.log(`username: ${green(userInfo().username)}`);
      break;
    case '--architecture':  
      console.log(`architecture: ${green(arch())}`);
      break;
    default:
      console.error(ERROR_COLOR, II);
  }
}