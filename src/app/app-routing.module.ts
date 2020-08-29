import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// site components
import { HomeComponent } from './components/views/site/home/home.component';
import { AboutComponent } from './components/views/site/about/about.component';
import { RegisterComponent } from './components/views/site/register/register.component';
import { ForgotComponent } from './components/views/site/forgot/forgot.component';

// app components
import { LoginComponent } from './components/views/app/login/login.component';
import { ProfileComponent } from './components/views/app/profile/profile.component';
import { LaunchOutComponent } from './components/views/app/launch-out/launch-out.component';
import { LaunchInComponent } from './components/views/app/launch-in/launch-in.component';
import { LogoutComponent } from './components/views/app/logout/logout.component';
import { LaunchFilterComponent } from './components/views/app/launch-filter/launch-filter.component';
import { LaunchShowComponent } from './components/views/app/launch-show/launch-show.component';
import { UserComponent } from './components/views/app/user/user.component';
import { UserDataComponent } from './components/views/app/user/user-data/user-data.component';
import { CategoriesComponent } from './components/views/app/user/categories/categories.component';
import { MonthDetailsComponent } from './components/views/app/month-details/month-details.component'; 

const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        pathMatch: 'full'
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
        path: "forgot",
        component: ForgotComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "logout",
        component: LogoutComponent
    },
    {
        path: "app/profile",
        component: ProfileComponent
    },
    {
        path: "app/launch/in",
        component: LaunchInComponent
    },
    {
        path: "app/launch/out",
        component: LaunchOutComponent
    },
    {
        path: "app/launch/filter",
        component: LaunchFilterComponent
    },
    {
        path: "app/launch/:id",
        component: LaunchShowComponent
    },
    {
        path: "app/user/options",
        component: UserComponent
    },
    {
        path: "app/user/data",
        component: UserDataComponent
    },
    {
        path: "app/user/categories",
        component: CategoriesComponent
    },
    {
        path: "app/details/:year/:month",
        component:MonthDetailsComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
