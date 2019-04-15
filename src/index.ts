import * as fs from 'fs'
import * as prompt from 'prompt';

import {tapComponent} from './generator/component';
import {tapComponentHtml} from './generator/component.html';
import {tapModule} from './generator/module';
import {tapNavbar} from './generator/navbar';
import {tapParentModule} from './generator/parent-module';
import {tapRouting} from './generator/route';
import {IModel, Model} from './model';

const projectFolder = process.env.projectFolder;
const outputFolder = process.env.outputFolder;
const role = process.env.role;
const entityName = process.env.entityName;

let model: IModel;

const schema = {
  properties: {
    projectFolder: {
      type: 'string',
      default: projectFolder,
      required: true,
      description:
          'Enter the absolute path app folder of your jhipster project',
    },
    entityName: {
      type: 'string',
      default: entityName,
      description: 'Enter the name of entity to clone',
      required: true,
    },
    outputFolder: {
      type: 'string',
      required: true,
      default: outputFolder,
      description: 'Enter the relative path of output folder',
    },
    restApi: {type: 'string', required: true, default: entityName},
    role: {
      type: 'string',
      required: true,
      default: role,
      description: 'Enter the role that can access the UI',
    },
  }
};

function askPrompts() {
  return new Promise(function(resolve, reject) {
    prompt.get(schema, function(err: any, result: any) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function checkOrCreateFolder(model: Model) {
  return new Promise(function(resolve, reject) {
    const fFolder =
        `${model.projectFolder}/pages/${model.outputFolder}/${model.entityName}`;

    if (!fs.existsSync(fFolder)) {
      fs.mkdirSync(fFolder);
    }
    resolve(model);
  });
}
prompt.start();
askPrompts()
    .then((model: Model) => checkOrCreateFolder(model))
    .then((model: Model) => tapRouting(model).then(() => model))
    .then((model: Model) => tapModule(model).then(() => model))
    .then((model: Model) => tapParentModule(model).then(() => model))
    .then((model: Model) => tapComponent(model).then(() => model))
    .then((model: Model) => tapComponentHtml(model).then(() => model))
    .then((model: Model) => tapNavbar(model).then(() => model))
    .then(() => console.log('success'))
    .catch((err: any) => console.error(err));


// var fse = require('fs-extra');
// console.debug('Hello Add Search\n');

// process.on('exit', function(code) {
//   return console.log(`About to exit with code ${code}`);
// });

// const iflow: IFlow = sanitizeInput();

// fse.pathExists(iflow.srcFolder)
//     .then((exists: boolean) => {
//       if (exists) {
//         return true;
//       } else {
//         console.error(`cant find ${iflow.srcFolder}`);
//         process.exit();
//       }
//     })
//     .then(() => fse.copy(iflow.srcFolder, iflow.destFolder))
//     .then(() => console.log(iflow))
//     .then(() => console.log('success!'))
//     .catch((err: any) => console.error(err))