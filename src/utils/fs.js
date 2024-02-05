import { readdir, rename } from 'node:fs/promises';
import { open, mkdir, rm as fsRm } from 'node:fs/promises';
import { join, basename } from 'node:path';
import { cwd } from 'node:process';
import { EOL } from 'node:os';
import { AE, ERROR_COLOR, FNE } from '../constants/error.js';
import { resolvePathArg, extractPaths } from '../helpers/path.js';
import { green, red } from './logger.js';

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
    console.log(join(cwd(), resolvePathArg(name)));
    const fd = await open(resolvePathArg(name), 'wx');
    fd.close();
    console.log(`File ${green(name)} was created`);
  } catch (err) {
    console.error(ERROR_COLOR, AE);
  }
};

export const rn = async (fromto, toDir = false) => {
  try {
    const [from, to] = extractPaths(fromto).map(path => resolvePathArg(path));
    if(toDir) {
      await cp(`${from} ${to}`);
      await rm(from);
      console.log(`File ${green(from)} was moved to ${green(to)}`);
    } else {
      await rename(from, to);
      console.log(`File ${green(from)} was renamed to ${green(to)}`);
    }
  } catch (e) {
    console.error(red(`source ${FNE} or destination ${AE}`));
  }
};

export const cp = async (fromto) => {
  const [source, newDir] = extractPaths(fromto).map(path => resolvePathArg(path));

  let fd;
  try {
    fd = await open(source, 'r');
    if(!(await fd.stat()).isFile()) 
      throw new Error(FNE)
  } catch {
    console.error(red(`Source ${FNE}`));
    return;
  } finally {
    fd?.close();
  }

  await mkdir(resolvePathArg(newDir), { recursive: true });

  const  destinationPath = join(resolvePathArg(newDir), basename(source));

  try {
    (await open(source, 'r')).createReadStream()
    .pipe(
      (await open(destinationPath, 'w')).createWriteStream()
    );

    console.log(`File ${green(source)} was copied to ${green(destinationPath)}`);
  } catch (e) {
    console.error(red('Error during file copy'));
  }

  return {
    source,
    destinationPath
  }
};

export const rm = async (path) => {
  try {
    await fsRm(resolvePathArg(path), { force: false })
    console.log(`File ${green(path)} was removed`);
  } catch {
    console.error(red('FS operation failed'));
  }  
}

export const cat = async (path) => {
  try {
    const fd = await open(resolvePathArg(path), 'r');
    if(!(await fd.stat()).isFile()) 
      throw new Error(FNE)
    const rs = fd.createReadStream();
    rs.pipe(process.stdout);
    rs.on('end', () => console.log(`${EOL}${green('File was readed successfully')}`));
  } catch {
    console.error(red(FNE));
  }
}