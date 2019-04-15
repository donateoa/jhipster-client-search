import {Model} from '../model';
import {Pfile} from '../utilities/files';
import {Capitalized} from '../utilities/sanitizers';

function getTemplate(entityName: string) {
  const capitalized: string = Capitalized(entityName);
  return `
    import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
    import { RouterModule } from '@angular/router';
    import { EntityFilterModule } from 'app/components/entity-filter/entity-filter.module';
    import { JhiLanguageHelper } from 'app/core';
    import { WiderpokerSharedModule } from 'app/shared';
    import { JhiLanguageService } from 'ng-jhipster';

    import { ${capitalized}Component } from './${entityName}.component';
    import { ${capitalized}Route } from './${entityName}.route';
    // import { ${capitalized}Service} from '../../../entities/${entityName}/${entityName}.service';

    const ENTITY_STATES = [...${capitalized}Route];

    @NgModule({
        imports: [WiderpokerSharedModule, EntityFilterModule, RouterModule.forChild(ENTITY_STATES)],
        declarations: [${capitalized}Component],
        entryComponents: [${capitalized}Component],
        providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    export class ${capitalized}PageModule {
        constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
            this.languageHelper.language.subscribe((languageKey: string) => {
                if (languageKey !== undefined) {
                    this.languageService.changeLanguage(languageKey);
                }
            });
        }
    }
`;
}


export function tapModule(model: Model) {
  const file =
      `${model.projectFolder}/pages/${model.outputFolder}/${model.entityName}/${model.entityName}.module.ts`;

  return Pfile.writeFile(file, getTemplate(model.entityName))
      .then((data: any) => {
        console.log('add file: ', file);
        return data;
      });
}