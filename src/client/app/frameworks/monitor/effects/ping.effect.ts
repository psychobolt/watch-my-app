// angular
import { Injectable } from '@angular/core';

// libs
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
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
    .mergeMap((action: PingEndpointAction) => this.pingService.pingEndpoint(action.payload).map(ping => {
      return {
        endpoint: action.payload, 
        ping
      };
    }))
    .map(payload => payload.ping === -1 ? new PingFailedAction(payload.endpoint) : new PingSuccessAction(payload.endpoint));
  
  @Effect() pingSuccess$ : Observable<Action> = this.actions$
    .ofType(PingActionTypes.PING_SUCCESS)
    .map((action: PingSuccessAction) => new PingRetryAction(action.payload));

  @Effect() pingFailed$ : Observable<Action> = this.actions$
    .ofType(PingActionTypes.PING_FAILED)
    .map((action: PingFailedAction) => new PingRetryAction(action.payload));

  @Effect() pingRetry$ : Observable<Action> = this.actions$
    .ofType(PingActionTypes.PING_RETRY)
    .switchMap((action: PingRetryAction) => Observable.of(action))
    .delay(5000)
    .flatMap((action: PingRetryAction) => this.endpointListService.getStoredEndpoint(action.payload.id || action.payload.value))
    //.map(payload => payload === null ? new PingCompletedAction(null) : new PingEndpointAction(payload));
    .map(payload => { 
      return payload === null ? new PingCompletedAction(null) : new PingEndpointAction(payload)
    });

  constructor(
    private actions$: Actions,
    private pingService: PingService,
    private endpointListService: EndpointListService
  ) { }

}
