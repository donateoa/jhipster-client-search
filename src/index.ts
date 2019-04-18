import * as fs from 'fs'
import * as prompt from 'prompt';

import {tapComponent} from './generator/component';
import {tapComponentHtml} from './generator/component.html';
import {tapModule} from './generator/module';
import {tapNavbar} from './generator/navbar';
import {tapParentModule} from './generator/parent-module';
import {tapRouting} from './generator/route';
import {IModel, Model} from './model';
import {Capitalized, LowerFirstChar} from './utilities/sanitizers';

const projectFolder = process.env.projectFolder;
const outputFolder = process.env.outputFolder;
const role = process.env.role;
const entityFolder = process.env.entityFolder;

const schema = {
  properties: {
    projectFolder: {
      type: 'string',
      default: projectFolder,
      required: true,
      description: 'Absolute jhipster app path',
    },
    entityFolder: {
      type: 'string',
      default: entityFolder,
      description: 'folder of entity to clone',
      required: true,
    },
    outputFolder: {
      type: 'string',
      required: true,
      default: outputFolder,
      description: 'Relative path of output folder',
    },
    restApi: {type: 'string', required: true, default: entityFolder},
    role: {
      type: 'string',
      required: true,
      default: role,
      description: 'role that can access the UI',
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
function sanitizeInput(model: Model) {
  model.entityName =
      model.entityFolder.split('-').map(t => Capitalized(t)).join('');
  model.translationLabel = LowerFirstChar(model.entityName);
  console.log(model);
  return model;
}
function checkOrCreateFolder(model: Model) {
  return new Promise(function(resolve, reject) {
    const fFolder =
        `${model.projectFolder}/pages/${model.outputFolder}/${model.entityFolder}`;

    if (!fs.existsSync(fFolder)) {
      fs.mkdirSync(fFolder);
    }
    resolve(model);
  });
}
prompt.start();
askPrompts()
    .then((model: Model) => sanitizeInput(model))
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