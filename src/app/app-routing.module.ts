import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TaskAddComponent } from './components/task-add/task-add.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { AuthGuard } from './guards/auth.guard';
import { PreventAuthGuard } from './guards/prevent-auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [PreventAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [PreventAuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
    { path: 'list', component: TaskListComponent, data: { state: 'list' } },
    { path: 'add', component: TaskAddComponent, data: { state: 'add' } },
    { path: '', pathMatch: 'full', redirectTo: 'list' },
  ]},
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
