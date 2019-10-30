import {Model} from '../model';
import {Pfile} from '../utilities/files';

function getTemplate(model: Model) {
  return `
  import {Routes} from '@angular/router';
  import {UserRouteAccessService} from 'app/core/auth/user-route-access-service';
  import {JhiResolvePagingParams} from 'ng-jhipster';
  import {${model.entityName}Component} from './${model.entityFolder}.component';
  import { CriteriaParamsResolve } from 'app/components/entity-filter/entity-filter.utils';

  export const ${model.entityName}Route: Routes = [{
    path: '${model.entityFolder}',
    component: ${model.entityName}Component,
    resolve: {pagingParams: JhiResolvePagingParams, criteria: CriteriaParamsResolve },
    data: {
      authorities: ['${model.role}'],
      defaultSort: 'id,asc',
      pageTitle: 'ldapAccountApp.${model.translationLabel}.home.title'
    },
    canActivate: [UserRouteAccessService]
  }];
`;
}


export function tapRouting(model: Model) {
  const file =
      `${model.projectFolder}/pages/${model.outputFolder}/${model.entityFolder}/${model.entityFolder}.route.ts`;

  return Pfile.writeFile(file, getTemplate(model)).then((data: any) => {
    console.log('add file: ', file);
    return data;
  });
}