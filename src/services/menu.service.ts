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
  private menuSubject = new BehaviorSubject<Menu[]>([]);
  private dataStore: { menu: any } = { menu: [] };
  readonly menu$ = this.menuSubject.asObservable();

  constructor(private http: HttpClient, private languageSvc: LanguageService) {}

  loadMenu(): void {
    const url = `${environment.apiUrl}/${this.languageSvc.getLanguage()}`;
    this.http.get(`${url}/menu`).subscribe(
      data => {
        this.dataStore.menu = data;
        this.menuSubject.next(Object.assign({}, this.dataStore).menu);
      },
      error => console.log('Could not load menu.')
    );
  }
}
