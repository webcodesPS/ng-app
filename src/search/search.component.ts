import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Helper } from '../helpers/helper';
import { environment } from '../environments/environment';
import { LanguageService } from '../services/language.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, startWith, takeUntil } from 'rxjs/operators';
import { animate, style, transition, trigger } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-test',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class SearchComponent implements OnInit, OnDestroy {
  unsubscribe: Subject<void> = new Subject<void>();
  env: any = environment;
  content: any;
  collection: any = [];
  dataSource = [];
  ids: any;

  constructor(
    private httpClient: HttpClient,
    private languageSvc: LanguageService,
    private translateSvc: TranslateService,
    private searchSvc: SearchService
  ) {}

  ngOnInit(): void {
    this.searchSvc.ids$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(ids => {
        this.ids = ids;
        this.sendGetCollection(this.getUri(this.languageSvc.getLanguage()) + '/collection', ids)
          .pipe(takeUntil(this.unsubscribe))
          .subscribe(res => {
            this.collection = res;
            // this.dataSource = res;
          });
      });

    this.translateSvc.onLangChange
      .pipe(startWith({}), takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.sendGetContent(this.getUri(this.languageSvc.getLanguage()))
          .pipe(takeUntil(this.unsubscribe))
          .subscribe(res => {
            this.content = res;
          });
      });
  }

  getUri(lang: string): string {
    return  Helper.prepareUri(
      this.env.apiUrl,
      lang,
      ''
    );
  }

  sendGetContent(uri): Observable<{}> {
    return this.httpClient.get(uri);
  }

  sendGetCollection(uri, params): Observable<{}> {
    return this.httpClient.post(uri, params);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
