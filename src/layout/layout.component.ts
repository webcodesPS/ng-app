import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { MatDrawerService } from '../services/mat-drawer.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  menu: any = [];

  @ViewChild('drawer', { static: true }) public drawer: MatDrawer;

  constructor(
    private http: HttpClient,
    private languageSvc: LanguageService,
    private matDrawerSvc: MatDrawerService
  ) {}

  ngOnInit() {
    const url = `${environment.apiUrl}/${this.languageSvc.getLanguage()}`;

    this.http.get(`${url}/menu`).subscribe(res => this.menu = res);

    this.matDrawerSvc.setDrawer(this.drawer);
  }
}
