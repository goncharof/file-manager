import { createHash } from 'node:crypto';
import { open } from 'node:fs/promises';
import { FNE } from '../constants/error.js';
import { resolvePathArg } from '../helpers/path.js';
import { green, red } from './logger.js';

export const calculateHash = async (path) => {
  try {
    const fd = await open(resolvePathArg(path), 'r');

    if(!(await fd.stat()).isFile()) 
      throw new Error(FNE)

    const rs = fd.createReadStream();
    const hash = createHash('sha256');
    rs.on('end', () => console.log(`hash sha256: ${green(hash.digest('hex'))}`));
    rs.pipe(hash);
  } catch (e) {
    console.error(red(FNE))
  }
};