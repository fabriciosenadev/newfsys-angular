import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

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
import { LogoutComponent } from './components/views/app/logout/logout.component';
import { LaunchFilterComponent } from './components/views/app/launch-filter/launch-filter.component';
import { LaunchShowComponent } from './components/views/app/launch-show/launch-show.component';

import { PositionDirective } from './directives/position.directive';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';

registerLocaleData(localePt);

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: false,
  decimal: ",",
  precision: 2,
  prefix: "",
  suffix: "",
  thousands: "."
};

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
    LaunchOutComponent,
    LogoutComponent,
    LaunchFilterComponent,
    LaunchShowComponent,
    PositionDirective
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
    CurrencyMaskModule,
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pt-BR'
  },
  { provide: CURRENCY_MASK_CONFIG, 
    useValue: CustomCurrencyMaskConfig 
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
