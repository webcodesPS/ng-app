import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSelectConfig } from '@ng-select/ng-select';
import { forkJoin, Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDrawerService } from '../../services/mat-drawer.service';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent implements OnInit {
  searchForm: FormGroup;
  elements: any = [];

  constructor(
    private sessionSvc: SessionService,
    private http: HttpClient,
    private languageSvc: LanguageService,
    private router: Router,
    private route: ActivatedRoute,
    private config: NgSelectConfig,
    private formBuilder: FormBuilder,
    private matDrawerSvc: MatDrawerService,
    public translate: TranslateService
  ) {}

  private _requestDataFromMultipleSources(): Observable<any[]> {
    const url = `${environment.apiUrl}/${this.languageSvc.getLanguage()}`;
    const elements = this.http.get(`${url}/elements`);

    return forkJoin([elements]);
  }

  ngOnInit(): void {
    this._requestDataFromMultipleSources().subscribe(responseList => {
      this.elements = responseList[0];
    });

    this.searchForm = this.formBuilder.group({
      elements: ['', Validators.required]
    });
  }

  toggleDrawer() {
    this.matDrawerSvc.toggle();
  }

  get form() { return this.searchForm.controls; }

  onSubmit() {
    console.log(this.form.elements.value);
  }

  useLanguage(language: string) {
    this.languageSvc.setLanguage(language);
    this.translate.use(language);
    this.reload();
  }

  reload() {
    const uri = this.router.url.replace(/^\//, '').toString();
    const param = this.route.snapshot.queryParamMap.get('returnUrl');

    this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri.substring(0, uri.indexOf('?')) || uri], {queryParams: { returnUrl: param }}));
  }

  logout(): void {
    this.sessionSvc.terminate();
  }
}
