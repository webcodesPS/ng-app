import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('../login/login.module').then(
            mod => mod.LoginModule
          ),
      },
      {
        path: 'test',
        loadChildren: () =>
          import('../test/test.module').then(
            mod => mod.TestModule
          ),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
