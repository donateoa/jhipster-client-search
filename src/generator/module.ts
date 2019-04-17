import {Model} from '../model';
import {Pfile} from '../utilities/files';
import {Capitalized} from '../utilities/sanitizers';

function getTemplate(model: Model) {
  return `
    import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
    import { RouterModule } from '@angular/router';
    import { EntityFilterModule } from 'app/components/entity-filter/entity-filter.module';
    import { JhiLanguageHelper } from 'app/core';
    import { WiderpokerSharedModule } from 'app/shared';
    import { JhiLanguageService } from 'ng-jhipster';

    import { ${model.entityName}Component } from './${model.entityFolder}.component';
    import { ${model.entityName}Route } from './${model.entityFolder}.route';
    // import { ${model.entityName}Service} from '../../../entities/${model.entityFolder}/${model.entityFolder}.service';

    const ENTITY_STATES = [...${model.entityName}Route];

    @NgModule({
        imports: [WiderpokerSharedModule, EntityFilterModule, RouterModule.forChild(ENTITY_STATES)],
        declarations: [${model.entityName}Component],
        entryComponents: [${model.entityName}Component],
        providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    export class ${model.entityName}PageModule {
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
      `${model.projectFolder}/pages/${model.outputFolder}/${model.entityFolder}/${model.entityFolder}.module.ts`;

  return Pfile.writeFile(file, getTemplate(model)).then((data: any) => {
    console.log('add file: ', file);
    return data;
  });
}