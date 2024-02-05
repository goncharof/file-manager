import { readdir } from 'node:fs/promises';
import { open } from 'node:fs/promises';
import { join, basename } from 'node:path';
import { cwd } from 'node:process';
import { AE, ERROR_COLOR, FNE } from '../constants/error.js';
import { isPathExists, resolvePathArg, extractPaths } from '../helpers/path.js';
import { green, red } from './logger.js';
import { EOL } from 'node:os';

export const ls = async () => {
  try {
    const files = (await readdir(cwd(), { withFileTypes: true }))
      .map(file => ({
        name: file.name,
        type: file.isDirectory() ? 'Directory' : file.isSymbolicLink() ? 'SymbolicLink' : 'File',
      }));
    
    console.table(files, ['name', 'type']);
  } catch (err) {
    console.error(ERROR_COLOR, err);
  }
};

export const add = async (name) => {
  try {
    await open(join(cwd(), resolvePathArg(name)), 'wx');
  } catch (err) {
    console.error(ERROR_COLOR, AE);
  }
};

export const rn = async (fromto) => {
  const [from, to] = extractPaths(fromto).map(path => resolvePathArg(path));

  if (await isPathExists(to) || !(await isPathExists(from))) {
    throw new Error('FS operation failed');
  } else {
    await fsRename(from, to);
  }
};

export const cp = async (fromto) => {
  const [source, newDir] = extractPaths(fromto).map(path => resolvePathArg(path));
  
  if ((await isPathExists(source))) {
    console.error(ERROR_COLOR, 'FS operation failed, source file does not exist');
  }

  const  destinationPath = join(newDir, basename(source));

  try {
    (await open(source), 'r').pipe(await open(destinationPath, 'w'));
  } catch {
    console.error(ERROR_COLOR,'Error during file copy');
  }

  return {
    source,
    destinationPath
  }
};

export const mv = async (fromto) => {
  try {
    const { source } = await cp(fromto);
    await rm(source);
  } catch {
    console.error(ERROR_COLOR, 'FS operation failed');
  }
  
}

export const rm = async (path) => {
  try {
    await rm(resolvePathArg(path), { force: false })
  } catch {
    console.error(ERROR_COLOR, 'FS operation failed');
  }  
}

export const cat = async (path) => {
  try {
    const fd = await open(resolvePathArg(path), 'r');
    if(!(await fd.stat()).isFile()) 
      throw new Error(FNE)
    const rs = fd.createReadStream();
    rs.pipe(process.stdout);
    rs.on('end', () => console.log(green('File was readed successfully')));
  } catch {
    console.error(red(FNE));
  }
}