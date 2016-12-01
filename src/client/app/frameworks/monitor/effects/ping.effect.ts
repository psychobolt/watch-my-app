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
  PingUnsupportedAction,
  PingFailedAction,
  PingRetryAction,
  PingEndpointAction,
  Disconnected
} from '../actions/index';
import { 
  EndpointListService, 
  PingService
} from '../services/index';
import { PingStatus } from '../models/ping.model';

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
    .map(payload => {
      switch (payload.ping) {
        case PingStatus.FAILED:
          return new PingFailedAction(payload);
        case PingStatus.UNSUPPORTED:
          return new PingUnsupportedAction(payload);
        case PingStatus.DISCONNECTED:
          return new Disconnected(payload);
        case PingStatus.STALE:
          return new PingCompletedAction();
        default:
          return new PingSuccessAction(payload)
      }
    });
  
  @Effect() pingSuccessOrFailure$ : Observable<Action> = this.actions$
    .ofType(PingActionTypes.PING_SUCCESS, PingActionTypes.PING_FAILED)
    .map((action: PingSuccessAction) => new PingRetryAction(action.payload.endpoint));

  @Effect() pingRetry$ : Observable<Action> = this.actions$
    .ofType(PingActionTypes.PING_RETRY)
    .switchMap((action: PingRetryAction) => Observable.of(action))
    .delay(5000)
    .flatMap((action: PingRetryAction) => this.endpointListService.getStoredEndpoint(action.payload.id || action.payload.value))
    .map(payload => payload === null ? new PingCompletedAction() : new PingEndpointAction(payload));

  constructor(
    private actions$: Actions,
    private pingService: PingService,
    private endpointListService: EndpointListService
  ) { }

}
