var fse = require('fs-extra');

export function tapModule(srcFolder: string) {
  const file = `${srcFolder}.module.ts`;
  return fse.pathExists(file).then(exists => console.log(exists))  // => false
}