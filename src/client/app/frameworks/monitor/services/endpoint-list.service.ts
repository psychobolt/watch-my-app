// angular
import { Injectable } from '@angular/core';

// libs
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// app
import { Config } from '../../core/index';
import { Analytics, AnalyticsService } from '../../analytics/index';
import { IAppState } from '../../../frameworks/ngrx/state/app.state';

// module
import { CATEGORY } from '../common/category.common';
import { DatabaseService, EndpointModel, InitEndpointsAction } from '../index';

@Injectable()
export class EndpointListService extends Analytics {

  constructor(
    public database: DatabaseService,
    public analytics: AnalyticsService,
    private store: Store<IAppState>
  ) {
    super(analytics);
    this.category = CATEGORY;

    this.store.dispatch(new InitEndpointsAction());
  }

  getEndpoints(): Observable<Array<EndpointModel>> {
    return this.database.sync('endpoints').map(response => {
      let endpoints: EndpointModel[] = [];
      if (response) { // TODO move to reducer
        for (let key of Object.keys(response)) {
          endpoints = [...endpoints, Object.assign({}, response[key], {id : key})];
        }
      }
      return endpoints;
    });
  }

  getStoredEndpoint(endpointOrId: string): Observable<EndpointModel> {
    return this.store.select(state => state.monitor.endpoints).
      map(endpoints => endpoints.find(entry => entry.id === endpointOrId || entry.value == endpointOrId));
  }

  addEndpoint(endpoint: string): Observable<EndpointModel> {
    return this.database.addChild(`endpoints`, {value: endpoint})
      .flatMap(() => this.getStoredEndpoint(endpoint));
  }

  updateEndpoint(endpoint: EndpointModel): Observable<EndpointModel> {
    return this.database.updateValue(`endpoints/${endpoint.id}`, {value: endpoint.value});
  }
}