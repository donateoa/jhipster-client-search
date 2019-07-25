import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {WiderpokerSharedModule} from 'app/shared';

import {EntityFilterComponent} from './entity-filter.component';

@NgModule({
  imports: [CommonModule, FormsModule, WiderpokerSharedModule],
  declarations: [EntityFilterComponent],
  exports: [EntityFilterComponent]
})
export class EntityFilterModule {
}
