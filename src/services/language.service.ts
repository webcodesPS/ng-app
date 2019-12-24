import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  constructor() { }

  public setLanguage(language: string): void {
    this.language = language;
  }

  public getLanguage(): string | null {
    return this.language;
  }

  private set language(value: string) {
    if (!value) {
      localStorage.removeItem('language');
    } else {
      localStorage.setItem('language', value);
    }
  }

  private get language(): string {
    return localStorage.getItem('language');
  }
}
