import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from '@core/interceptors';

import { AuthService, GroupsService } from '@core/services';

import { AppComponent } from './app.component';
import { GroupListComponent } from './features/main/features/groups/group-list/group-list.component';
import { GroupItemComponent } from './features/main/features/groups/group-item/group-item.component';
import { HeaderComponent } from './common/shared/header/header.component';
import { MainComponent } from './features/main/components/main/main.component';
import { StudentsListComponent } from './features/main/features/students/students-list/students-list.component';

@NgModule({
  declarations: [
    AppComponent,
    GroupListComponent,
    GroupItemComponent,
    HeaderComponent,
    MainComponent,
    StudentsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
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
  bootstrap: [AppComponent]
})
export class AppModule { }
