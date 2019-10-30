import {Model} from '../model';
import {Pfile} from '../utilities/files';

const replace = require('replace-in-file');

function addMenuItem(file: string, model: Model) {
  const test =
      `data-search-client-root-${model.outputFolder}="${model.entityFolder}"`
  return Pfile.readFile(file).then((data: string) => {
    if (data.includes(test)) {
      console.log('test match: Not added to imports', test);
      return 'match';
    } else {
      const options = {
        files: file,
        from:
            `<!-- data-search-client-root-${model.outputFolder} - search-client module will add new menu items here -->`,
        to: `<li data-search-client-root-${model.outputFolder}="${model.entityFolder}">
                        <a class="dropdown-item" routerLink="${model.outputFolder}/${model.entityFolder}" routerLinkActive="active"
                            [routerLinkActiveOptions]="{ exact: true }" (click)="collapseNavbar()">
                            <fa-icon icon="asterisk" fixedWidth="true"></fa-icon>
                            <span jhiTranslate="global.menu.entities.${model.translationLabel}">${model.entityName}</span>
                        </a>
                    </li>
                    <!-- data-search-client-root-${model.outputFolder} - search-client module will add new menu items here -->`,
      };
      console.log('test not match: added to imports', file);
      return replace(options).then(() => 'updated');
    }
  })
}

export function tapNavbar(model: Model) {
  const file = `${model.projectFolder}/layouts/navbar/navbar.component.html`;

  return addMenuItem(file, model);
}