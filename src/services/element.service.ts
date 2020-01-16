import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from './language.service';
import { environment } from '../environments/environment';

export interface Element {
  id?: number | string;
  name?: number;
}

@Injectable({ providedIn: 'root' })
export class ElementService {
  private elementSubject = new BehaviorSubject<Element[]>([]);
  private dataStore: { element: any } = { element: [] };
  readonly element$ = this.elementSubject.asObservable();

  constructor(private http: HttpClient, private languageSvc: LanguageService) {}

  loadElements(): void {
    const url = `${environment.apiUrl}/${this.languageSvc.getLanguage()}`;
    this.http.get(`${url}/elements`).subscribe(
      data => {
        this.dataStore.element = data;
        this.elementSubject.next(Object.assign({}, this.dataStore).element);
      },
      error => console.log('Could not load elements.')
    );
  }
}
