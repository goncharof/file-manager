import { cwd, chdir } from 'node:process'
import { homedir } from 'node:os'
import { join, isAbsolute, normalize, resolve } from 'node:path'
import { DNE } from '../constants/error.js'
import { blue, red, yellow } from './logger.js'

const changeDirectory = (path) => {
  try {
    chdir(resolve(path.trim()))
  } catch {
    console.error(red(DNE))
  }
}

export const printCWD = () => console.log(`${blue('You are currently in ')}${yellow(cwd())}`);

export const navUp = () => {
  try {
    chdir(join(cwd(), '..'))
  } catch {
    console.log(DNE)
  }
}

export const cd = (path) => {
  console.log(normalize(path), 'normalized path');
  changeDirectory(isAbsolute(path) ? path : join(cwd(), path))
}

changeDirectory(homedir())