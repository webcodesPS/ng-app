import { NgModule } from '@angular/core';
import { SearchComponent } from './search.component';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { ApplicationPipesModule } from '../shared/application-pipes.module';

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, SearchRoutingModule, ApplicationPipesModule],
  providers: [],
  bootstrap: [SearchComponent]
})
export class SearchModule { }
