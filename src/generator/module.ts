import {Model} from '../model';
import {Pfile} from '../utilities/files';
import {Capitalized} from '../utilities/sanitizers';

function getTemplate(model: Model) {
  let translationImport = '';
  let translationProvider = '';
  let translationConstructor = `
    export class ${model.entityName}PageModule {
        constructor() {
        }
    }`;
  if (model.useTranslation == 'y') {
    translationImport = `
        import { JhiLanguageHelper } from 'app/core/language/language.helper';
        import { JhiLanguageService } from 'ng-jhipster';
        `;
    translationConstructor = `
        export class ${model.entityName}PageModule {
            constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
                this.languageHelper.language.subscribe((languageKey: string) => {
                    if (languageKey !== undefined) {
                        this.languageService.changeLanguage(languageKey);
                    }
                });
            }
        }`;
    translationProvider =
        `{ provide: JhiLanguageService, useClass: JhiLanguageService }`;
  }

  return `
    import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
    import { RouterModule } from '@angular/router';
    import { EntityFilterModule } from 'app/components/entity-filter/entity-filter.module';
    import { ${model.projectName}SharedModule } from 'app/shared/shared.module';
${translationImport}
    import { ${model.entityName}Component } from './${model.entityFolder}.component';
    import { ${model.entityName}Route } from './${model.entityFolder}.route';
    // import { ${model.entityName}Service} from '../../../entities/${model.entityFolder}/${model.entityFolder}.service';

    const ENTITY_STATES = [...${model.entityName}Route];

    @NgModule({
        imports: [${model.projectName}SharedModule, EntityFilterModule, RouterModule.forChild(ENTITY_STATES)],
        declarations: [${model.entityName}Component],
        entryComponents: [${model.entityName}Component],
        providers: [${translationProvider}],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
${translationConstructor}
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