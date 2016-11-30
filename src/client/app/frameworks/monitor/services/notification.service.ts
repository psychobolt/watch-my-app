// angular
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// libs
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// app
import { IAppState } from '../../../frameworks/ngrx/state/app.state';

// module
import { Notification } from '../models/notification.model';
import { InitNotificationsAction } from '../actions/notification.action';

@Injectable()
export class NotificationService {

  constructor(
    private http: Http,
    private store: Store<IAppState>
  ) {
    this.store.dispatch(new InitNotificationsAction());
  }

  getNotifcations() : Observable<Array<Notification>> {
    return this.store.select(state => state.monitor.rules.notifications);
  }

  sendEmail() {
    console.log('sending email');
  }
}