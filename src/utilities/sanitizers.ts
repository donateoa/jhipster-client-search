import {IFlow} from '../model/flow';

import {coloredLog as console} from './colored-log';

export function sanitizeInput(): IFlow {
  const params = process.argv.slice(2);
  if (!params[0]) {
    console.error('Error: Missing source path folder.');
    process.exit();
  }
  const srcFolder = params[0];
  console.debug('We are going to create a serch version of ');
  console.log(`Wource ${srcFolder}`);

  if (!params[1]) {
    console.error('Error: Missing destination path folder.');
    process.exit();
  }
  const destFolder = params[1];
  console.log(`Destination folder ${destFolder}`);
  const array = srcFolder.split('/');
  const entity = array[array.length - 1];
  return { destFolder: destFolder, srcFolder: srcFolder, entity: entity }
}
export function checkExist() {
  const params = process.argv.slice(2);
  if (!params[0]) {
    console.error('Error: Missing source path folder.');
    process.exit();
  }
  const srcFolder = params[0];
  console.debug('We are going to create a serch version of ');
  console.log(`Detected source ${srcFolder}`);

  if (!params[1]) {
    console.error('Error: Missing destination path folder.');
    process.exit();
  }
  const destFolder = params[1];
  console.log(`Detected destination folder ${destFolder}`);
  return { destFolder: destFolder, srcFolder: srcFolder }
}