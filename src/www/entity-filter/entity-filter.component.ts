import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IEntityFilter } from './entity-filter.model';

@Component({
    selector: 'jhi-entity-filter',
    templateUrl: './entity-filter.component.html',
    styles: ['./entity-filter.component.css']
})
export class EntityFilterComponent implements OnInit {
    private _entity: any;
    keys: any = [];
    private filtersKey = ['in', 'equals', 'contains'];
    currentFilter: IEntityFilter = { key: '', value: '' };
    filterList: IEntityFilter[] = [];
    @Output()
    changeList: EventEmitter<IEntityFilter[]> = new EventEmitter<IEntityFilter[]>();
    @Input()
    initialFilter: IEntityFilter;
    @Input()
    showDateFormat: Boolean;
    @Input()
    set entities(entity: any) {
        if (entity && Object.keys(entity).length > 0) {
            this._entity = entity;
            const keys = Object.keys(this._entity);
            this.keys = [].concat.apply([], keys.map(k => this.filtersKey.map(t => k + '.' + t)));
        }
    }

    get entity(): any {
        return this._entity;
    }
    constructor() {}

    ngOnInit() {
        if (this.initialFilter) {
            this.currentFilter = this.initialFilter;
            this.addFilter();
        } else {
            this.currentFilter = { key: '', value: '' };
        }
    }

    addFilter() {
        if (this.currentFilter.key && this.currentFilter.value) {
            const f = this.currentFilter;
            // remove filter with the same key/value pair.
            this.filterList = this.filterList.filter(t => !(t.key === f.key && t.value === t.value));
            // add current filter to the list
            this.filterList.push(Object.assign({}, f));
        }
        this.changed();
    }
    clear() {
        this.currentFilter = { key: '', value: '' };
    }
    remove(filter: IEntityFilter) {
        this.filterList = this.filterList.filter(t => t.key !== filter.key && t.value !== filter.value);
        this.changed();
    }

    changed() {
        this.changeList.emit(this.filterList);
    }
}
