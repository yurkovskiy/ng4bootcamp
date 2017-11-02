import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Route } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthInterceptor } from '@core/interceptors';

import { AuthService, GroupsService, GroupsResolver } from '@core/services';

import { AppComponent } from './app.component';
import { GroupListComponent } from './features/main/features/groups/group-list/group-list.component';
import { GroupItemComponent } from './features/main/features/groups/group-item/group-item.component';
import { HeaderComponent } from './common/shared/header/header.component';
import { MainComponent } from './features/main/components/main/main.component';
import { StudentsListComponent } from './features/main/features/students/students-list/students-list.component';
import { AddSubjectComponent } from './common/shared/add-subject/add-subject.component';

const routes: Route[] = [
  {
    component: MainComponent,
    path: 'main',
    children: [{
      component: GroupListComponent,
      path: 'groups',
      resolve: {
        groups: GroupsResolver
      },
      children: [{
        path: ':id',
        component: GroupItemComponent
      }]
    }, {
      component: StudentsListComponent,
      path: 'students',
    }, {
      path: '**',
      redirectTo: 'groups'
    }]
  },
  {
    path: '**',
    redirectTo: 'main'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    GroupListComponent,
    GroupItemComponent,
    HeaderComponent,
    MainComponent,
    StudentsListComponent,
    AddSubjectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService,
    GroupsService,
    GroupsResolver
  ],
  entryComponents: [
    AddSubjectComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
