import { access, constants } from 'node:fs/promises';
import { join, isAbsolute } from "node:path";

export async function isPathExists (filename) {
  try {
    await access(filename, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export const resolvePathArg = (arg) => {
  arg = arg.replace(/^"(.+(?="$))"$/, '$1').trim();

  return isAbsolute(arg) ? arg : join(process.cwd(), arg)
}

export const extractPaths = (inputString) => 
  inputString
    .match(/(?:"[^"]*"|\S+)/g)
    .map(path => path.replace(/^"(.+)"$/, '$1'));