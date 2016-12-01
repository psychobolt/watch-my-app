// angular
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

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
    if (!endpoint) {
      return Observable.of(PingStatus.STALE);
    }
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

  private head(endpoint: EndpointModel, startTime: number): Observable<any> {
    let ping;
    return this.http.head('proxy?url=' + endpoint.value).map((res) => {
      let endTime = performance.now(); 
      ping = endTime - startTime;
      return Observable.of(ping);
    }).catch(this.handleError);
  }

  private get(endpoint: EndpointModel, startTime: number): Observable<number> {
    let ping;
    return this.http.get('proxy?url=' + endpoint.value).map(() => {
      let endTime = performance.now(); 
      ping = endTime - startTime;
      return Observable.of(ping);
    }).catch(this.handleError);
  }

  private handleError(err: Response): Observable<number> {
    if (err.status === 0) {
      return Observable.of(PingStatus.DISCONNECTED);
    }
    return Observable.of(PingStatus.FAILED);
  }
}
