import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreModule } from '@core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsListComponent } from './features/main/features/students/students-list/students-list.component';
import { AddSubjectComponent } from './common/shared/add-subject/add-subject.component';
import { SignInComponent } from './features/auth/sign-in/sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentsListComponent,
    AddSubjectComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    CoreModule,
    AppRoutingModule
  ],
  entryComponents: [
    AddSubjectComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
