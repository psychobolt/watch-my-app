// angular
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

//libs
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// app
import { IAppState } from '../../../frameworks/ngrx/state/app.state';

// module
import { EndpointModel, EndpointType } from '../models/endpoint.model';
import { PingStatus } from '../models/ping.model';

@Injectable()
export class PingService {

  constructor(
    private http: Http,
    private store: Store<IAppState>
  ) {
  }

  pingEndpoint(endpoint: EndpointModel): Observable<number> {
    let startTime = performance.now();
    switch (endpoint.type) {
      case EndpointType.HEAD:
        return this.head(endpoint, startTime);
      case EndpointType.GET:
        return this.get(endpoint, startTime);
      default:
        return Observable.of(PingStatus.UNSUPPORTED);
    }
  }

  private head(endpoint: EndpointModel, startTime: number): Observable<number> {
    let ping;
    return this.http.head(endpoint.value + "?" + new Date().getTime()).map(() => {
      let endTime = performance.now(); 
      ping = endTime - startTime;
      return Observable.of(ping);
    }).catch(err => {
      // TODO disconnect
      return Observable.of(PingStatus.FAILED);
    });
  }

  private get(endpoint: EndpointModel, startTime: number): Observable<number> {
    let ping;
    return this.http.get(endpoint.value + "?" + new Date().getTime()).map(() => {
      let endTime = performance.now(); 
      ping = endTime - startTime;
      return Observable.of(ping);
    }).catch(err => {
      // TODO disconnect
      return Observable.of(PingStatus.FAILED);
    });
  }
}
