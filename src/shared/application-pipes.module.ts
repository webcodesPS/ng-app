import { NgModule } from '@angular/core';
import { SafeHtml } from '../shared/pipes/safe-html';

@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [
    SafeHtml
  ],
  exports: [
    SafeHtml
  ]
})
export class ApplicationPipesModule {}
