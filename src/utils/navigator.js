import { cwd, chdir } from 'node:process'
import { homedir } from 'node:os'
import { DNE } from '../constants/error.js'
import { blue, red, yellow } from './logger.js'
import { resolvePathArg } from '../helpers/path.js'

export const printCWD = () => console.log(`${blue('You are currently in ')}${yellow(cwd())}`);

export const navUp = () => {
  try {
    chdir(resolvePathArg('..'))
  } catch {
    console.error(red(DNE))
  }
}

export const cd = (path) => {
  try {
    chdir(resolvePathArg(path))
  } catch {
    console.error(red(DNE))
  }
}

cd(homedir())