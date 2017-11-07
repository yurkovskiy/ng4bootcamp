import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthInterceptor } from '@core/interceptors';

import { AuthService, GroupsService } from '@core/services';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/shared/header/header.component';
import { MainComponent } from './features/main/components/main/main.component';
import { StudentsListComponent } from './features/main/features/students/students-list/students-list.component';
import { AddSubjectComponent } from './common/shared/add-subject/add-subject.component';
import { SignInComponent } from './features/auth/sign-in/sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    StudentsListComponent,
    AddSubjectComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService,
    GroupsService
  ],
  entryComponents: [
    AddSubjectComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
