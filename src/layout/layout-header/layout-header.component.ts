import { Component, OnDestroy, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDrawerService } from '../../services/mat-drawer.service';
import { MenuService } from '../../services/menu.service';
import { ElementService } from '../../services/element.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent implements OnInit, OnDestroy {
  unsubscribe: Subject<void> = new Subject<void>();
  searchForm: FormGroup;
  elements: any = [];

  constructor(
    public translate: TranslateService,
    private sessionSvc: SessionService,
    private languageSvc: LanguageService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private matDrawerSvc: MatDrawerService,
    private menuSvc: MenuService,
    private elementSvc: ElementService
  ) {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => {
    //   return false;
    // };

    // this.router.events.pipe(takeUntil(this.unsubscribe)).subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     this.router.navigated = false;
    //   }
    // });
  }

  ngOnInit(): void {
    this.elementSvc.element.subscribe(res => this.elements = res);

    this.searchForm = this.formBuilder.group({
      elements: ['', Validators.required]
    });
  }

  toggleDrawer(): void {
    this.matDrawerSvc.toggle();
  }

  get form() { return this.searchForm.controls; }

  onSubmit(): void {
    if (this.form.elements.value) {
      this.router.navigate([], { queryParams: { ids: this.form.elements.value } });
    }
  }

  useLanguage(language: string): void {
    this.languageSvc.setLanguage(language);
    this.translate.use(language);
    this.menuSvc.loadMenu();
    this.reload();
  }

  reload(): void {
    const uri = this.router.url.replace(/^\//, '').toString();
    const param = this.route.snapshot.queryParamMap.get('returnUrl');

    this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri ? (uri.substring(0, uri.indexOf('?')) || uri) : 'home'], {queryParams: { returnUrl: param }}));
  }

  logout(): void {
    this.sessionSvc.terminate();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
