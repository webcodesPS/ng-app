import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { NavigationEnd, Router } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { Helper } from '../helpers/helper';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-test',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {
  unsubscribe: Subject<void> = new Subject<void>();
  public content: any;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private languageSvc: LanguageService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    this.router.events.pipe(takeUntil(this.unsubscribe)).subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
  }

  ngOnInit() {
    const uri = Helper.prepareUri(
      environment.apiUrl,
      this.languageSvc.getLanguage(),
      this.router.url
    );

    this.sendGetRequest(uri)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        this.content = res;
      });
  }

  sendGetRequest(uri) {
    return this.httpClient.get(uri);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
