import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GroupListComponent } from './features/main/features/groups/group-list/group-list.component';
import { GroupItemComponent } from './features/main/features/groups/group-item/group-item.component';
import { HeaderComponent } from './common/shared/header/header.component';
import { MainComponent } from './features/main/components/main/main.component';
import { StudentsListComponent } from './features/main/features/students/students-list/students-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GroupListComponent,
    GroupItemComponent,
    HeaderComponent,
    MainComponent,
    StudentsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
