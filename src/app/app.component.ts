import { Component } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { MenuService } from '../services/menu.service';
import { ElementService } from '../services/element.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private languageSvc: LanguageService,
    private menuSvc: MenuService,
    private elementSvc: ElementService
  ) {
    this.languageSvc.loadLanguage();
    this.menuSvc.loadMenu();
    this.elementSvc.loadElements();
  }
}
