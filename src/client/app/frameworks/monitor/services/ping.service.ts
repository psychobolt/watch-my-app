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

  private head(endpoint: EndpointModel, startTime: number): Observable<number> {
    return this.http.head('proxy?' + new Date().getTime() + '&url=' + endpoint.value)
      .map((res) => this.getPing(startTime))
      .catch((err) => Observable.of(this.handleError(err, this.getPing(startTime))));
  }

  private get(endpoint: EndpointModel, startTime: number): Observable<number> {
    return this.http.get('proxy?' + new Date().getTime() + '&url=' + endpoint.value)
      .map((res) => this.getPing(startTime))
      .catch((err) => Observable.of(this.handleError(err, this.getPing(startTime))));
  }

  private handleError(err: Response, ping: number): number {
    if (err.status === 599) {
      return PingStatus.DISCONNECTED;
    } else if (err.status === 503) {
      return PingStatus.FAILED;
    }
    return ping;
  }

  private getPing(startTime: number) {
    let endTime = performance.now(); 
    let ping = endTime - startTime;
    return Math.floor(ping);
  }
}
