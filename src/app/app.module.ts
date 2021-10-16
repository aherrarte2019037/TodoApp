import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './components/main/app.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { ToastComponent } from './components/shared/toaster/toast.component';
import { TitleCasePipe, UpperCasePipe } from '@angular/common';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot({
      toastComponent: ToastComponent,
      autoDismiss: true,
      timeOut: 4000,
      tapToDismiss: false,
    }),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  entryComponents: [ToastComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    TitleCasePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
