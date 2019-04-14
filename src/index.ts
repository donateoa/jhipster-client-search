import {IFlow} from './model/flow';
import {coloredLog as console} from './utilities/colored-log';
import {sanitizeInput} from './utilities/sanitizers';

var fse = require('fs-extra');
console.debug('Hello Add Search\n');

process.on('exit', function(code) {
  return console.log(`About to exit with code ${code}`);
});

const iflow: IFlow = sanitizeInput();

fse.pathExists(iflow.srcFolder)
    .then((exists: boolean) => {
      if (exists) {
        return true;
      } else {
        console.error(`cant find ${iflow.srcFolder}`);
        process.exit();
      }
    })
    .then(() => fse.copy(iflow.srcFolder, iflow.destFolder))
    .then(() => console.log(iflow))
    .then(() => console.log('success!'))
    .catch((err: any) => console.error(err))