import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeModule} from './home/home.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SnackbarComponent} from './core/components/snackbar/snackbar.component';
import {Interceptor} from "./core/security/interceptor/interceptor";
import {AuthService} from "./core/security/service/auth.service";
import {LoginModule} from "./login/login.module";
import {ErrorStateMatcher, MAT_DATE_LOCALE, MatProgressSpinnerModule, MatSpinner, ShowOnDirtyErrorStateMatcher} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {GlobalAppService} from "./core/commons/service/global-app.service";
import {SnackbarService} from "./core/service/snackbar.service";
import {ConfirmDialogService} from "./core/commons/service/confirm-dialog.service";
import {OverlayService} from "./core/commons/service/overlay.service";


@NgModule({
  declarations: [
    AppComponent,
    SnackbarComponent
  ],
  entryComponents: [
    SnackbarComponent,
    MatSpinner
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomeModule,
    LoginModule,
    HttpClientModule,
    MatSnackBarModule,
    FlexLayoutModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true},
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    AuthService,
    OverlayService,
    GlobalAppService,
    SnackbarService,
    ConfirmDialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
