import {Model} from '../model';
import {Pfile} from '../utilities/files';
import {Capitalized} from '../utilities/sanitizers';
const replace = require('replace-in-file');

function addProperties(file: string, model: Model) {
  const options = {
    files: file,
    from: `constructor(`,
    to: `
    criteria: any;
    filterTemplate = new ${model.entityName}();

    constructor(`,
  };
  return replace(options).then(() => 'updated');
}
function addSnipets(file: string) {
  const options = {
    files: file,
    from: `loadAll() {`,
    to: `changeFilter(criteria) {
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
    from: `.query({`,
    to: `.query({criteria: this.criteria,`,
  };
  return replace(options).then(() => 'updated');
}
function amendService(file: string, model: Model) {
  const options = {
    files: file,
    from: `./${model.entityFolder}.service`,
    to: `../../../entities/${model.microservice}${model.entityFolder}/${model.entityFolder}.service`,
  };
  return replace(options).then(() => 'updated');
}
function amendTransition(file: string, model: Model) {
  const original = `queryParams: {`;
  const newFunction =
      `queryParams: {criteria: entityFilterDecodeCriteria(this.criteria),`;

  return Pfile
      .prepend(
          file,
          `import { entityFilterDecodeCriteria } from 'app/components/entity-filter/entity-filter.utils';`)
      .then(t => replace({
              files: file,
              from: original,
              to: newFunction,
            }))
      .then(
          t => replace({
            files: file,
            from: `this.router.navigate(['/${model.entityFolder}']`,
            to: `this.router.navigate(['/${model.outputFolder}/${model.entityFolder}']`,
          }))
      .then(t => replace({
              files: file,
              from: `'/${model.entityFolder}',`,
              to: `'/${model.outputFolder}/${model.entityFolder}',`,
            }))
      .then(
          t => replace({
            files: file,
            from: `this.page = data.pagingParams.page;`,
            to: `this.criteria = data.criteria; this.page = data.pagingParams.page;`,
          }))

      .then(() => 'updated');
}
function addDeclaration(file: string, model: Model) {
  const test =
      `import {${model.entityName}} from 'app/shared/model/${model.microservice}${model.entityFolder}.model';`
  return Pfile.prepend(file, test).then(() => 'updated');
}
export function tapComponent(model: Model) {
  const source =
      `${model.projectFolder}/entities/${model.microservice}${model.entityFolder}/${model.entityFolder}.component.ts`;
  const destination =
      `${model.projectFolder}/pages/${model.outputFolder}/${model.entityFolder}/${model.entityFolder}.component.ts`;

  return Pfile.copyFile(source, destination)
      .then(() => addProperties(destination, model))
      .then(() => addSnipets(destination))
      .then(() => amendLoadData(destination))
      .then(() => amendService(destination, model))
      .then(() => amendTransition(destination, model))
      .then(() => addDeclaration(destination, model))
      .then((data: any) => {
        console.log('added file: ', destination);
        return data;
      });
}