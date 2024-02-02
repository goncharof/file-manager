import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';
import { open } from 'node:fs/promises';
import { AE } from './constants/error.js';

export const ls = async () => {
  try {
    const files = (await readdir(cwd(), { withFileTypes: true }))
      .map(file => ({
        name: file.name,
        type: file.isDirectory() ? 'Directory' : file.isSymbolicLink() ? 'SymbolicLink' : 'File',
      }));
    
    console.table(files, ['name', 'type']);
  } catch (err) {
    console.log(err);
    throw new Error('FS operation failed');
  }
};

export const add = async (name) => {
  try {
    console.log(join(cwd(), name.trim()));
    await open(join(cwd(), name.trim()), 'wx');
  } catch (err) {
    console.log(AE);
  }
};