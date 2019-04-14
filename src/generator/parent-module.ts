import {Model} from '../model';
import {Pfile} from '../utilities/files';
import {Capitalized} from '../utilities/sanitizers';

const replace = require('replace-in-file');

function addDeclaration(file: string, moduleName: string) {
  const test = `import {${moduleName}} from './client/client.module';`
  return Pfile.readFile(file).then((data: string) => {
    if (data.includes(test)) {
      console.log('test match: Not added to declaration', test);
      return 'match';
    } else {
      console.log('test not match: added to declaration', file);
      return Pfile.prepend(file, test).then(() => 'updated');
    }
  })
}
function addToImports(file: string, moduleName: string) {
  const test = moduleName;
  return Pfile.readFile(file).then((data: string) => {
    if (data.includes(test)) {
      console.log('test match: Not added to imports', test);
      return 'match';
    } else {
      const options = {
        files: file,
        from: 'imports: [',
        to: `imports: [${moduleName},`,
      };
      console.log('test not match: added to imports', file);
      return replace(options).then(() => 'updated');
    }
  })
}
export function tapParentModule(model: Model) {
  const capitalized = Capitalized(model.entityName);
  const file =
      `${model.projectFolder}/pages/${model.outputFolder}/${model.outputFolder}.module.ts`;
  const moduleName = `${capitalized}PageModule`;
  /*
  NOTE: call with this sequence
    1. addToImport
    2. addDeclaration
  */
  return addToImports(file, moduleName)
      .then(() => addDeclaration(file, moduleName));
}