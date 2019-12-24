import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { Location } from '@angular/common';

export interface Menu {
  id?: string;
}

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent implements OnInit {
  public menu: any;

  constructor(
    private sessionSvc: SessionService,
    private httpClient: HttpClient,
    public translate: TranslateService,
    private languageSvc: LanguageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.httpClient.get(`${environment.apiUrl}/menu`).subscribe(res => {
      this.menu = res;
      console.log(res);
    });
  }

  useLanguage(language: string) {
    this.languageSvc.setLanguage(language);
    this.translate.use(language);
    location.reload();
  }

  logout(): void {
    this.sessionSvc.terminate();
  }
}
