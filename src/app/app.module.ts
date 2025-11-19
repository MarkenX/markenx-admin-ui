import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoaderComponent } from './shared/components/loader/loader.component';
import { PrimengModule } from './shared/modules/primeng.module';

import { ConfirmationService, MessageService } from 'primeng/api';

import { AuthInterceptor } from './core/auth/interceptors/auth.interceptor';
import { ErrorInterceptor } from './core/auth/interceptors/error.interceptor';
import { LoadingInterceptor } from './core/auth/interceptors/loading.interceptor';
import { LoginComponent } from './features/auth/login/login.component';
import { MainLayoutComponent } from './shared/components/layout/main-layout/main-layout.component';
import { SidebarComponent } from './shared/components/layout/sidebar/sidebar.component';
import { TopbarComponent } from './shared/components/layout/topbar/topbar.component';
import { HomeComponent } from './features/dashboard/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainLayoutComponent,
    SidebarComponent,
    TopbarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    PrimengModule,
    LoaderComponent
  ],
  providers: [
    MessageService,
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
