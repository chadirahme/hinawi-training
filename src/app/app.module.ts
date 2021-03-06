import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material/material.module";
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import { SafePipePipe } from './safe-pipe.pipe';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { RegisterComponent } from './register/register.component';
import Amplify, { Auth } from 'aws-amplify';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AlertComponent} from "./_components/alert/alert.component";

Amplify.configure({
  Auth:{
    mandatorySignIn:true,
    region: 'us-east-1',
    userPoolId: 'poolid',
    userPoolWebClientId: 'userPoolWebClientId',
    authenticationFlowType:'USER_PASSWORD_AUTH'
  }

});

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    LayoutComponent,
    HomeComponent,
    SafePipePipe,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
