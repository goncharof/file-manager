import { cwd, chdir } from 'node:process'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { OF } from './constants/error.js'

export const printCWD = () => console.log(`You are currently in ${cwd()}`)
export const changeDirectory = (path) => {
  try {
    chdir(path)
  } catch {
    console.log(OF)
  }
}

export const navUp = () => {
  try {
    chdir(join(cwd(), '..'))
  } catch {
    console.log(OF)
  }
}

changeDirectory(homedir())