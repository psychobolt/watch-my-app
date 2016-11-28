// angular
import { Injectable } from '@angular/core';

// libs
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

// module
import { 
  EndpointListService,
  InitEndpointsAction,
  InitEndpointsFailedAction,
  EndpointsSyncedAction,
  AddAction,
  UpdateAction,
  EndpointAddedAction,
  EndpointUpdatedAction,
  EndpointListActionTypes,
  PingEndpointAction
} from '../index';

@Injectable()
export class EndpointListEffects {

  @Effect() init$ : Observable<Action> = this.actions$
    .ofType(EndpointListActionTypes.INIT)
    .switchMap((action: InitEndpointsAction) => {
      return this.endpointListService.getEndpoints();
    })
    .map(payload => {
      let endpoints = payload;
      return new EndpointsSyncedAction(endpoints);
    })
    .catch(err => {
      console.log(err);
      return Observable.of(new InitEndpointsFailedAction());
    });

  @Effect() add$: Observable<Action> = this.actions$
    .ofType(EndpointListActionTypes.ADD)
    .switchMap((action: AddAction) => this.endpointListService.addEndpoint(action.payload))
    .map(payload => {
      //let endpoint = payload.value;
      // analytics
      // this.endpointListService.track(EndpointListActionTypes.ENDPOINT_ADDED, { label: endpoint });
      return new EndpointAddedAction(payload);
    })
    .map(action => {
      return new PingEndpointAction(action.payload);
    });

  @Effect() update$: Observable<Action> = this.actions$
    .ofType(EndpointListActionTypes.UPDATE)
    .switchMap((action: UpdateAction) => this.endpointListService.updateEndpoint(action.payload))
    .map(payload => {
      return new EndpointUpdatedAction(payload);
    });

  constructor(
    private actions$: Actions,
    private endpointListService: EndpointListService
  ) { }
}