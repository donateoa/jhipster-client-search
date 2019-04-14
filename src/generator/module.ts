import {IFlow} from '../model/flow';

var fse = require('fs-extra');

export function tapModule(iflow: IFlow) {
  const file = `${iflow.destFolder}/${iflow.entity}.module.ts`;
  return fse.pathExists(file).then((exists: Boolean) => {
    if (!exists) {
      throw new Error(`${file} does not exist.`);
    } else {
      console.log('exists');
    }
  })  // => false
}