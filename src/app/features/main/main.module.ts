import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderModule } from '@shared/header/header.module';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './components/main/main.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    HeaderModule
  ],
  declarations: [
    MainComponent
  ]
})
export class MainModule { }
