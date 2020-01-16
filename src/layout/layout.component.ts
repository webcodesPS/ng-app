import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { MatDrawerService } from '../services/mat-drawer.service';
import { MenuService } from '../services/menu.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  unsubscribe: Subject<void> = new Subject<void>();
  menu: any = [];

  @ViewChild('drawer', { static: true }) public drawer: MatDrawer;

  constructor(
    private menuSvc: MenuService,
    private matDrawerSvc: MatDrawerService
  ) {}

  ngOnInit() {
    this.menuSvc.menu$.subscribe(res => this.menu = res);
    this.matDrawerSvc.setDrawer(this.drawer);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
