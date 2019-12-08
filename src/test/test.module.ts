import { NgModule } from '@angular/core';
import { TestComponent } from './test.component';
import { CommonModule } from '@angular/common';
import {TestRoutingModule} from './test-routing.module';

@NgModule({
  declarations: [TestComponent],
  imports: [CommonModule, TestRoutingModule],
  providers: [],
  bootstrap: [TestComponent]
})
export class TestModule { }
