import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MatDrawerService {
  private drawer: MatDrawer;

  setDrawer(drawer: MatDrawer) {
    this.drawer = drawer;
  }

  toggle(): void {
    this.drawer.toggle();
  }
}
