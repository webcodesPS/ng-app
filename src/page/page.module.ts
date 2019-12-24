import { NgModule } from '@angular/core';
import { PageComponent } from './page.component';
import { CommonModule } from '@angular/common';
import {PageRoutingModule} from './page-routing.module';

@NgModule({
  declarations: [PageComponent],
  imports: [CommonModule, PageRoutingModule],
  providers: [],
  bootstrap: [PageComponent]
})
export class PageModule { }
