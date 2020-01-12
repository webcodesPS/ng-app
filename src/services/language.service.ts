import { Injectable } from '@angular/core';
import defaultLanguage from '../assets/i18n/en.json';
import { environment } from '../environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {

  constructor(public translate: TranslateService) {}

  loadLanguage(): void {
    this.translate.setTranslation('en', defaultLanguage);
    this.translate.setDefaultLang(environment.language);
    this.translate.use(
      this.getLanguage() !== null
        ? this.getLanguage()
        : this.translate.getDefaultLang()
    );

    if (this.getLanguage() === null) {
      this.setLanguage(this.translate.getDefaultLang());
    }
  }

  public setLanguage(language: string): void {
    LanguageService.language = language;
  }

  public getLanguage(): string | null {
    return LanguageService.language;
  }

  private static set language(value: string) {
    if (!value) {
      localStorage.removeItem('language');
    } else {
      localStorage.setItem('language', value);
    }
  }

  private static get language(): string {
    return localStorage.getItem('language');
  }
}
