// angular
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// module
import { DatabaseService, EndpointListService, PingService } from './index';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    HttpModule,
    RouterModule
  ],
  providers: [
    DatabaseService,
    EndpointListService,
    PingService
  ]
})
export class MonitorModule {
  constructor(@Optional() @SkipSelf() parentModule: MonitorModule) {
    if (parentModule) {
      throw new Error('MonitorModule already loaded; Import in root module only.');
    }
  }
}