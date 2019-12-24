import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { MaterialModule } from 'src/shared/material.module';
import { LayoutHeaderComponent } from './layout-header/layout-header.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    LayoutComponent,
    LayoutHeaderComponent
  ],
  imports: [
    LayoutRoutingModule,
    MaterialModule,
    HttpClientModule,
    CommonModule,
    TranslateModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class LayoutModule { }
