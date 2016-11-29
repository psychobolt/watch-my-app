// angular
import { Injectable } from '@angular/core';

// libs
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

// module
import {
  PingActionTypes,
  PingCompletedAction,
  PingSuccessAction,
  PingFailedAction,
  PingRetryAction,
  PingEndpointAction,
  EndpointListService, 
  PingService
} from '../index';

@Injectable()
export class PingEffects {

  @Effect() ping$ : Observable<Action> = this.actions$
    .ofType(PingActionTypes.PING_ENDPOINT)
    .switchMap((action: PingEndpointAction) => Observable.of(action))
    // this.pingService.pingEndpoint(action.payload).map(ping => {
    //   return {
    //     endpoint: action.payload, 
    //     ping
    //   };
    // }))
    // .map(payload => new PingSuccessAction(payload.endpoint))
    .map(action => new PingSuccessAction(action.payload))
  
  @Effect() pingSuccess$ : Observable<Action> = this.actions$
    .ofType(PingActionTypes.PING_SUCCESS)
    .map((action: PingSuccessAction) => new PingRetryAction(action.payload));

  // @Effect() pingFailed$ : Observable<Action> = this.actions$
  //   .ofType(PingActionTypes.PING_FAILED)
  //   .map((action: PingFailedAction) => new PingRetryAction(action.payload));

  // @Effect() pingRetry$ : Observable<Action> = this.actions$
  //   .ofType(PingActionTypes.PING_RETRY)
  //   .map((action: PingRetryAction) => new PingEndpointAction(action.payload))
  //   .delay(5000);

  constructor(
    private actions$: Actions,
    private pingService: PingService,
    private endpointListService: EndpointListService
  ) { }

}