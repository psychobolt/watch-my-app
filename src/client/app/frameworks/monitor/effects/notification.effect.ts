// angular
import { Injectable } from '@angular/core';

// libs
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

// module
import { NotificationService } from '../services/notification.service'; 
import { NotificationModel } from '../models/notification.model';
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
    .mergeMap(notifications => 
      Observable.from(notifications)
        .flatMap(notification => this.notificationService.runNotifier(notification)))
    .map(result => new SendNotificationAction(result));

  constructor(
    private actions$: Actions,
    private notificationService: NotificationService
  ) { }
}