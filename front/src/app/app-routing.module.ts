import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/@core/auth/guards/auth.guard';
import { NoAuthGuard } from 'src/@core/auth/guards/noAuth.guard';
import { LoginComponent } from './components/login/login.component';
import { PeopleComponent } from './components/people/people.component';

const routes: Routes = [
  {
    path: 'people',
    component: PeopleComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard]
  },
  { path: '', redirectTo: '/people', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
