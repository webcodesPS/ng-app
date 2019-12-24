import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';
import { LoginModule } from '../login/login.module';
import { ProfileModule } from '../profile/profile.module';
import { PageModule } from '../page/page.module';

const routes: Routes = [
  { path: '', loadChildren: () =>
      import('../layout/layout.module').then(mod => mod.LayoutModule) },

  // { path: '**', loadChildren: () =>
  //     import('../page/page.module').then(mod => mod.PageModule) }
  // { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), LayoutModule, LoginModule, PageModule, ProfileModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
