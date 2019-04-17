import {Model} from '../model';
import {Pfile} from '../utilities/files';
import {Capitalized} from '../utilities/sanitizers';
const replace = require('replace-in-file');

function addProperties(file: string) {
  const options = {
    files: file,
    from: `<br/>`,
    to: `<br/>
    <jhi-entity-filter [entities]="filterTemplate" (changeList)="changeFilter($event)"></jhi-entity-filter>
    `,
  };
  return replace(options).then(() => 'updated');
}

export function tapComponentHtml(model: Model) {
  const source =
      `${model.projectFolder}/entities/${model.entityFolder}/${model.entityFolder}.component.html`;
  const destination =
      `${model.projectFolder}/pages/${model.outputFolder}/${model.entityFolder}/${model.entityFolder}.component.html`;

  return Pfile.copyFile(source, destination)
      .then(() => addProperties(destination))
      .then((data: any) => {
        console.log('added file: ', destination);
        return data;
      });
}