import {Model} from '../model';
import {Pfile} from '../utilities/files';
import {Capitalized} from '../utilities/sanitizers';

const replace = require('replace-in-file');

function addDeclaration(file: string, model: Model) {
  const test = `${model.entityFolder}/${model.entityFolder}.module';`
  const importUrl =
      `import {${model.entityName}PageModule} from './${model.entityFolder}/${model.entityFolder}.module';`;
  return Pfile.readFile(file).then((data: string) => {
    if (data.includes(test)) {
      console.log('Already imported, Not add ' + test + ' to declaration');
      return 'match';
    } else {
      console.log('add decalartion ' + test + ' to ', file);
      return Pfile.prepend(file, importUrl).then(() => 'updated');
    }
  })
}
function addToImports(file: string, model: Model) {
  const test = `${model.entityName}PageModule`;
  return Pfile.readFile(file).then((data: string) => {
    if (data.includes(test)) {
      console.log('Already imported, Not add ' + test + ' to imports');
      return 'match';
    } else {
      const options = {
        files: file,
        from: 'imports: [',
        to: `imports: [
        ${test}, `,
      };
      console.log('add import ' + test + ' to ', file);
      return replace(options).then(() => 'updated');
    }
  })
}
export function tapParentModule(model: Model) {
  const capitalized = Capitalized(model.entityName);
  const file =
      `${model.projectFolder}/pages/${model.outputFolder}/${model.outputFolder}.module.ts`;
  /*
  NOTE: call with this sequence
    1. addToImport
    2. addDeclaration
  */
  return addToImports(file, model).then(() => addDeclaration(file, model));
}