// angular
import { Injectable } from '@angular/core';

// libs
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import * as moment from 'moment';

// module
import { NotificationService } from '../services/notification.service'; 
import { 
  InitNotificationsAction, 
  SendNotificationAction,
  NotificationActionTypes
} from '../actions/notification.action';

@Injectable()
export class NotificationEffects {

  @Effect({dispatch: false}) init$ : Observable<Action> = this.actions$
    .ofType(NotificationActionTypes.INIT)
    .switchMap((action : InitNotificationsAction) => this.notificationService.getNotifcations())
    .map(notifications => {
      notifications.forEach(notification => {
        console.log(moment.duration(notification.interval.duration).humanize());
        moment.now() 
      });
      return null;
    });

  constructor(
    private actions$: Actions,
    private notificationService: NotificationService
  ) { }
}