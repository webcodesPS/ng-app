import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from './language.service';
import { environment } from '../environments/environment';

export interface Collection {
  id?: number | string;
  name?: number;
}

@Injectable({ providedIn: 'root' })
export class CollectionService {
  private collectionSubject = new BehaviorSubject<Collection[]>([]);
  private dataStore: { collection: any } = { collection: [] };
  readonly collection$ = this.collectionSubject.asObservable();

  constructor(private http: HttpClient, private languageSvc: LanguageService) {}

  loadCollections(params): void {
    const url = `${environment.apiUrl}/${this.languageSvc.getLanguage()}`;
    this.http.post(`${url}/collections`, params).subscribe(
      data => {
        this.dataStore.collection = data;
        this.collectionSubject.next(Object.assign({}, this.dataStore).collection);
      },
      error => console.log('Could not load collections.')
    );
  }
}
