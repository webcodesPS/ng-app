import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { Helper } from '../helpers/helper';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-test',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300, style({opacity: 1}))
      ])
    ])
  ]
})
export class PageComponent implements OnInit, OnDestroy {
  unsubscribe: Subject<void> = new Subject<void>();
  public content: any;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private languageSvc: LanguageService
  ) {}

  ngOnInit(): void {
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

  sendGetRequest(uri): Observable<{}> {
    return this.httpClient.get(uri);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
