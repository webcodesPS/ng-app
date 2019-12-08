import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { HomeModule } from '../home/home.module';
import { LoginComponent } from '../login/login.component';
import { LoginModule } from '../login/login.module';
import { ProfileComponent } from '../profile/profile.component';
import { ProfileModule } from '../profile/profile.module';
import { AuthGuards } from '../shared/guards/auth.guards';

const routes: Routes = [
  { path: '', loadChildren: () =>
      import('../home/home.module').then(mod => mod.HomeModule) },
  // { path: 'login', component: LoginComponent },
  { path: 'profile', canActivate: [AuthGuards], component: ProfileComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HomeModule, LoginModule, ProfileModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
