import { access, constants } from 'node:fs/promises';
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";


export function extendedDirname(url, ...paths) {
  const filename = fileURLToPath(url);

  return join(dirname(filename), ...paths);
}

export async function isPathExists (filename) {
  try {
    await access(filename, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}