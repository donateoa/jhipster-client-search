# Import Entity filter into your page.

## Import component into you ng module

```
import {EntityFilterModule} from '../../shared/entity-filter/entity-filter.module';
```

## Add html

```
 <jhi-entity-filter [entities]="filterTemplate" (changeList)="changeFilter($event)"></jhi-entity-filter>
```

## Add component js code

# define a local variable into scope named criteria

```
 criteria: any;
 filterTemplate = new entity();
```

# add follow snippet

changeFilter(criteria) {
this.criteria = criteria;
this.transition();
}

# Amend loadAll function
Replace loadAll function with the follow code
```
   loadAll() {
        this.widerpokerRulesService
            .query({
                criteria: this.criteria,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IWiderpokerRules[]>) => this.paginateWiderpokerRules(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }
```

# Amend transition and clear functions
Replace transition and clear functions with the follow code

```
    transition() {
        this.router.navigate(['/search/widerpoker-rules'], {
            queryParams: {
                criteria: entityFilterDecodeCriteria(this.criteria),
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/search/widerpoker-rules',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

```

