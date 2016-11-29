// angular
import { Injectable } from '@angular/core';

// libs
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

// app
import { Analytics, AnalyticsService } from '../../analytics/index';
import { IAppState } from '../../../frameworks/ngrx/state/app.state';

// module
import { CATEGORY } from '../common/category.common';
import { DatabaseService, EndpointModel, EndpointViewModel, InitEndpointsAction } from '../index';

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

  getStoredEndpoints(): Observable<Array<EndpointViewModel>> {
    return Observable.create((observer: Observer<Array<EndpointViewModel>>) => {
      this.store.select(state => state.monitor.endpoints).subscribe(endpoints => {
        observer.next(endpoints);
        observer.complete();
      });
    });
  }

  getStoredEndpoint(endpointOrId: string): Observable<EndpointModel> {
    return Observable.create((observer: Observer<EndpointModel>) => {
      this.store.select(state => state.monitor.endpoints).subscribe(endpoints => {
        observer.next(endpoints.find(entry => entry.id === endpointOrId || entry.value === endpointOrId));
        observer.complete();
      });
    });
  }

  addEndpoint(endpoint: string): Observable<EndpointModel> {
    return this.database.addChild(`endpoints`, {value: endpoint});
  }

  updateEndpoint(endpoint: EndpointModel): Observable<EndpointModel> {
    return this.database.updateValue(`endpoints/${endpoint.id}`, {value: endpoint.value});
  }
}
