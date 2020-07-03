import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { HeaderComponent } from './components/template/header/header.component';
import { FooterComponent } from './components/template/footer/footer.component';

import { TopMenuComponent } from './components/template/site/top-menu/top-menu.component';
import { TopLinkComponent } from './components/template/site/top-link/top-link.component';

import { SideMenuComponent } from './components/template/app/side-menu/side-menu.component';

import { HomeComponent } from './components/views/site/home/home.component';
import { AboutComponent } from './components/views/site/about/about.component';
import { ForgotComponent } from './components/views/site/forgot/forgot.component';
import { RegisterComponent } from './components/views/site/register/register.component';

import { LoginComponent } from './components/views/app/login/login.component';
import { ProfileComponent } from './components/views/app/profile/profile.component';
import { MenuComponent } from './components/template/app/menu/menu.component';
import { LaunchInComponent } from './components/views/app/launch-in/launch-in.component';
import { LaunchOutComponent } from './components/views/app/launch-out/launch-out.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    TopMenuComponent,
    TopLinkComponent,
    ForgotComponent,
    ProfileComponent,
    MenuComponent,
    SideMenuComponent,
    LaunchInComponent,
    LaunchOutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    HttpClientModule,

    MatToolbarModule,
    MatSidenavModule,
    MatSnackBarModule,
    
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
