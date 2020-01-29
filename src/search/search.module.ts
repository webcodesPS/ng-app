import { NgModule } from '@angular/core';
import { SearchComponent } from './search.component';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { ApplicationPipesModule } from '../shared/application-pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, SearchRoutingModule, ApplicationPipesModule, TranslateModule],
  providers: [],
  bootstrap: [SearchComponent]
})
export class SearchModule { }
