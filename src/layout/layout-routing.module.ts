import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuards } from '../shared/guards/auth.guards';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../search/search.module').then(
            mod => mod.SearchModule
          ),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('../login/login.module').then(
            mod => mod.LoginModule
          ),
      },
      {
        path: 'profile',
        canActivate: [AuthGuards],
        loadChildren: () =>
          import('../profile/profile.module').then(
            mod => mod.ProfileModule
          ),
      },
      {
        path: 'test',
        loadChildren: () =>
          import('../test/test.module').then(
            mod => mod.TestModule
          ),
      },
      {
        path: '**',
        loadChildren: () =>
          import('../page/page.module').then(
            mod => mod.PageModule
          ),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
