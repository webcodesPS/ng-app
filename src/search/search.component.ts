import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Helper } from '../helpers/helper';
import { environment } from '../environments/environment';
import { LanguageService } from '../services/language.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
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
        animate(300, style({opacity: 1}))
      ])
    ])
  ]
})
export class SearchComponent implements OnInit, OnDestroy {
  unsubscribe: Subject<void> = new Subject<void>();
  public content: any;
  ids: string[];

  constructor(
    public route: ActivatedRoute,
    private httpClient: HttpClient,
    private languageSvc: LanguageService,
    private translateSvc: TranslateService,
    private searchSvc: SearchService
  ) {}

  ngOnInit(): void {

    // console.log('search IDs', this.searchSvc.searchIds);

    this.translateSvc.onLangChange.pipe(startWith({}), takeUntil(this.unsubscribe)).subscribe(() => {
      const uri = Helper.prepareUri(
        environment.apiUrl,
        this.languageSvc.getLanguage(),
        ''
      );

      this.sendGetRequest(uri)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(res => {
          this.content = res;
        });
    });

    this.route.queryParamMap
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(params => (this.ids = params.getAll('ids')));
    console.log(this.ids);
  }

  sendGetRequest(uri): Observable<{}> {
    return this.httpClient.get(uri);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
