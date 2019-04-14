import {coloredLog as console} from './utilities/colored-log';
import {sanitizeInput} from './utilities/sanitizers';
var fse = require('fs-extra');
console.debug('Hello Add Search\n');

process.on('exit', function(code) {
  return console.log(`About to exit with code ${code}`);
});

const params: {destFolder: string, srcFolder: string} = sanitizeInput();
fse.pathExists(params.srcFolder)
    .then((exists: boolean) => {
      if (exists) {
        return true;
      } else {
        console.error(`cant find ${params.srcFolder}`);
        process.exit();
      }
    })
    .then(() => fse.copy(params.srcFolder, params.destFolder))
    .then(() => console.log('success!'))
    .catch((err: any) => console.error(err))