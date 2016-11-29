// angular
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

//libs
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// app
import { IAppState } from '../../../frameworks/ngrx/state/app.state';

// module
import { EndpointModel } from '../index';

@Injectable()
export class PingService {

  constructor(
    private http: Http,
    private store: Store<IAppState>
  ) {
  }

  pingEndpoint(endpoint: EndpointModel): Observable<number> {
    let startTime = performance.now();
    let ping;
    return this.http.get(endpoint.value).map(() => {
      let endTime = performance.now(); 
      ping = endTime - startTime;
      return Observable.of(ping);
    }).catch(err => {
      return Observable.of(-1);
    });
  }
}
