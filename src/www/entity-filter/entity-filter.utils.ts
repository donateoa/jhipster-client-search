import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of } from 'rxjs';

function uncodedCriteria(criteria: string) {
  return criteria.split('##').map(t => {
    const arr = decodeURIComponent(t).split('=');
    if (!arr[1]) {
      return {};
    }
    const key = arr[0];
    const value = arr[1];
    const out = {};
    out['key'] = key;
    out['value'] = value;
    return out;
  });
}
function decodeCriteriaItem(myData: any) {
  const out = [];
  for (const key in myData) {
    if (myData.hasOwnProperty(key)) {
      out.push(encodeURIComponent(myData[key]));
    }
  }
  return out.join('=');
}
export function entityFilterDecodeCriteria(criteria: any[]) {
  if (!criteria) {
    return null;
  }
  return encodeURIComponent(
      criteria.map(t => decodeCriteriaItem(t)).join('##'));
}

@Injectable({providedIn: 'root'})
export class CriteriaParamsResolve implements Resolve<any> {
  constructor() {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
      Observable<any> {
    const s = route.queryParams['criteria'] ?
        uncodedCriteria(route.queryParams['criteria']) :
        null;
    return of (s);
  }
}
