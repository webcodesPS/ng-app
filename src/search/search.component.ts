import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Helper } from '../helpers/helper';
import { environment } from '../environments/environment';
import { LanguageService } from '../services/language.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-test',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  unsubscribe: Subject<void> = new Subject<void>();
  public content: any;
  ids: string[];

  constructor(
    public route: ActivatedRoute,
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

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(params => (this.ids = params.getAll('ids')));
    // console.log(this.ids);

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
  }

  sendGetRequest(uri): Observable<{}> {
    return this.httpClient.get(uri);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
