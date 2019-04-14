import * as fs from 'fs'
const prepend = require('prepend');

export const Pfile = {
  writeFile(file: string, text: string) {
    return new Promise(function(resolve, reject) {
      fs.writeFile(file, text, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  },
  readFile(fileName: string) {
    return new Promise(function(resolve, reject) {
      fs.readFile(fileName, 'utf8', (err, data) => {
        err ? reject(err) : resolve(data);
      });
    });
  },
  copyFile(source: string, destination: string) {
    return new Promise(function(resolve, reject) {
      fs.copyFile(source, destination, (err) => {
        err ? reject(err) : resolve('copied');
      });
    });
  },
  prepend(file: string, text: string) {
    return new Promise(function(resolve, reject) {
      prepend(file, text, function(err: any) {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  },
}
