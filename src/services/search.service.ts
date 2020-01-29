import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private readonly searchSubject = new BehaviorSubject<number[]>([]);
  private dataStore: { ids: any } = { ids: [] };
  readonly ids$ = this.searchSubject.asObservable();

  constructor(public route: ActivatedRoute) {}

  loadSearch(): void {
    this.route.queryParamMap.subscribe(params => {
      this.dataStore.ids = params.getAll('ids');
      this.searchSubject.next(Object.assign({}, this.dataStore).ids);
    }, error => console.log('Could not load search.'));
  }
}
