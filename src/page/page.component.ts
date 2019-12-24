import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { Helper } from '../helpers/helper';

@Component({
  selector: 'app-test',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  public content: any;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private languageSvc: LanguageService
  ) {}

  ngOnInit() {
    const uri = Helper.prepareUri(
      environment.apiUrl,
      this.languageSvc.getLanguage(),
      this.router.url
    );

    this.sendGetRequest(uri).subscribe(res => {
      this.content = res;
    });
  }

  sendGetRequest(uri) {
    return this.httpClient.get(uri);
  }
}
