import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// site components
import { HomeComponent } from './components/views/site/home/home.component';
import { AboutComponent } from './components/views/site/about/about.component';
import { RegisterComponent } from './components/views/site/register/register.component';
import { ForgotComponent } from './components/views/site/forgot/forgot.component';
import { TryResetComponent } from './components/views/site/try-reset/try-reset.component';

// app components
import { LoginComponent } from './components/views/app/login/login.component';
import { PrepareProfileComponent } from './components/views/app/prepare-profile/prepare-profile.component';
import { ProfileComponent } from './components/views/app/profile/profile.component';
import { LogoutComponent } from './components/views/app/logout/logout.component';
import { LaunchFilterComponent } from './components/views/app/launch-filter/launch-filter.component';
import { LaunchShowComponent } from './components/views/app/launch-show/launch-show.component';
import { UserComponent } from './components/views/app/user/user.component';
import { UserDataComponent } from './components/views/app/user/user-data/user-data.component';
import { CategoriesComponent } from './components/views/app/user/categories/categories.component';
import { MonthDetailsComponent } from './components/views/app/month-details/month-details.component'; 
import { AddLaunchInComponent } from './components/views/app/launch-in/add-launch-in/add-launch-in.component';
import { EditLaunchInComponent } from './components/views/app/launch-in/edit-launch-in/edit-launch-in.component';
import { AddLaunchOutComponent } from './components/views/app/launch-out/add-launch-out/add-launch-out.component';
import { EditLaunchOutComponent } from './components/views/app/launch-out/edit-launch-out/edit-launch-out.component';

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
        path: "try_reset",
        component: TryResetComponent
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
        path: "app/prepare/profile",
        component: PrepareProfileComponent
    },
    {
        path: "app/profile",
        component: ProfileComponent
    },
    {
        path: "app/launch/in",
        component: AddLaunchInComponent,
        pathMatch: 'full'
    },
    {
        path: 'app/launch/in/:id',
        component: EditLaunchInComponent
    },
    {
        path: "app/launch/out",
        component: AddLaunchOutComponent,
        pathMatch: 'full'
    },
    {
        path:"app/launch/out/:id",
        component: EditLaunchOutComponent
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
