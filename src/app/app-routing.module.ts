import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// site components
import { HomeComponent } from './components/views/site/home/home.component';
import { AboutComponent } from './components/views/site/about/about.component';
import { RegisterComponent } from './components/views/site/register/register.component';
import { LoginComponent } from './components/views/site/login/login.component';
import { ForgotComponent } from './components/views/site/forgot/forgot.component';

// app components
import { ProfileComponent } from './components/views/app/profile/profile.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path:"forgot",
    component: ForgotComponent
  },
  {
    path: "app/profile",
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
