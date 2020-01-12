import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { MatDrawerService } from '../services/mat-drawer.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { LanguageService } from '../services/language.service';
import {trigger, style, animate, transition} from '@angular/animations';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300, style({opacity: 1}))
      ])
    ])
  ]
})
export class LayoutComponent implements OnInit {
  menu: any = [];

  @ViewChild('drawer', { static: true }) public drawer: MatDrawer;

  constructor(
    private menuSvc: MenuService,
    private matDrawerSvc: MatDrawerService
  ) {}

  ngOnInit() {
    this.menuSvc.menu.subscribe(res => this.menu = res);
    this.matDrawerSvc.setDrawer(this.drawer);
  }
}
