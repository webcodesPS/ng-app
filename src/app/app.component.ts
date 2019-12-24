import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import defaultLanguage from '../assets/i18n/en.json';
import { LanguageService } from '../services/language.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public translate: TranslateService,
    private languageSvc: LanguageService
  ) {
    translate.setTranslation('en', defaultLanguage);
    translate.setDefaultLang(environment.language);
    translate.use(
      this.languageSvc.getLanguage() !== null
        ? this.languageSvc.getLanguage()
        : translate.getDefaultLang()
    );
  }
}
