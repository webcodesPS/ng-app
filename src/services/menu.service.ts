import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from './language.service';
import { environment } from '../environments/environment';

export interface Menu {
  id?: number | string;
  name?: number;
}

@Injectable({ providedIn: 'root' })
export class MenuService {
  private menuBehaviorSubject = new BehaviorSubject<Menu[]>([]);
  private dataStore: { menu: Menu[] } = { menu: [] };
  readonly menu = this.menuBehaviorSubject.asObservable();

  constructor(private http: HttpClient, private languageSvc: LanguageService) {}

  loadAll() {
    const url = `${environment.apiUrl}/${this.languageSvc.getLanguage()}`;
    this.http.get(`${url}/menu`).subscribe(
      data => {
        // @ts-ignore
        this.dataStore.menu = data;
        this.menuBehaviorSubject.next(Object.assign({}, this.dataStore).menu);
      },
      error => console.log('Could not load menu.')
    );
  }
}
