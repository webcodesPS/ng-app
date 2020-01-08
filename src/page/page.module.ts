import { NgModule } from '@angular/core';
import { PageComponent } from './page.component';
import { CommonModule } from '@angular/common';
import { PageRoutingModule } from './page-routing.module';
import { ApplicationPipesModule } from '../shared/application-pipes.module';

@NgModule({
  declarations: [PageComponent],
  imports: [CommonModule, PageRoutingModule, ApplicationPipesModule],
  providers: [],
  bootstrap: [PageComponent]
})
export class PageModule { }
