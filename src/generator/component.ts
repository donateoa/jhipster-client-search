import {Model} from '../model';
import {Pfile} from '../utilities/files';
import {Capitalized} from '../utilities/sanitizers';
const replace = require('replace-in-file');

function addProperties(file: string, entityName: string) {
  const capitalized: string = Capitalized(entityName);
  const options = {
    files: file,
    from: `
    constructor(`,
    to: `
    criteria: any;
    filterTemplate = new ${capitalized}();
    
    constructor(`,
  };
  return replace(options).then(() => 'updated');
}
function addSnipets(file: string) {
  const options = {
    files: file,
    from: `
    loadAll() {`,
    to: `
    changeFilter(criteria) {
        this.criteria = criteria;
        this.transition();
    }
    loadAll() {`,
  };
  return replace(options).then(() => 'updated');
}
function amendLoadData(file: string) {
  const options = {
    files: file,
    from: /page: this.page/g,
    to: `criteria: this.criteria, page: this.page`,
  };
  return replace(options).then(() => 'updated');
}
function amendService(file: string, entityName: string) {
  const options = {
    files: file,
    from: `./${entityName}.service`,
    to: `../../../entities/${entityName}/${entityName}.service`,
  };
  return replace(options).then(() => 'updated');
}

export function tapComponent(model: Model) {
  const source =
      `${model.projectFolder}/entities/${model.entityName}/${model.entityName}.component.ts`;
  const destination =
      `${model.projectFolder}/pages/${model.outputFolder}/${model.entityName}/${model.entityName}.component.ts`;

  return Pfile.copyFile(source, destination)
      .then(() => addProperties(destination, model.entityName))
      .then(() => addSnipets(destination))
      .then(() => amendLoadData(destination))
      .then(() => amendService(destination, model.entityName))

      .then((data: any) => {
        console.log('added file: ', destination);
        return data;
      });
}