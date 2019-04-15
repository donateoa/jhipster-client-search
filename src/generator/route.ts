import {Model} from '../model';
import {Pfile} from '../utilities/files';
import {Capitalized} from '../utilities/sanitizers';

function getTemplate(model: Model) {
  const entityName = model.entityName;
  const capitalized: string = Capitalized(entityName);
  return `
  import {Routes} from '@angular/router';
  import {UserRouteAccessService} from 'app/core';
  import {JhiResolvePagingParams} from 'ng-jhipster';
  import {${capitalized}Component} from './${entityName}.component';

  export const ${capitalized}Route: Routes = [{
    path: '${entityName}',
    component: ${capitalized}Component,
    resolve: {pagingParams: JhiResolvePagingParams},
    data: {
      authorities: ['${model.role}'],
      defaultSort: 'id,asc',
      pageTitle: 'widerpokerApp.${entityName}.home.title'
    },
    canActivate: [UserRouteAccessService]
  }];
`;
}


export function tapRouting(model: Model) {
  const file =
      `${model.projectFolder}/pages/${model.outputFolder}/${model.entityName}/${model.entityName}.route.ts`;

  return Pfile.writeFile(file, getTemplate(model)).then((data: any) => {
    console.log('add file: ', file);
    return data;
  });
}