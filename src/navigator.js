import { cwd, chdir } from 'node:process'
import { homedir } from 'node:os'
import { join, isAbsolute, normalize, resolve } from 'node:path'
import { DNE } from './constants/error.js'

const changeDirectory = (path) => {
  try {
    chdir(resolve(path.trim()))
  } catch {
    console.log(DNE)
  }
}

export const printCWD = () => console.log(`You are currently in ${cwd()}`)

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