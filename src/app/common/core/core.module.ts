import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthService, GroupsService } from '@core/services';
import { GroupsResolver } from '@core/resolvers/groups.resolver';
import { AuthGuard } from '@core/guards/auth.guard';
import { AuthInterceptor } from '@core/interceptors';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    AuthGuard,
    AuthService,
    GroupsService,
    GroupsResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
