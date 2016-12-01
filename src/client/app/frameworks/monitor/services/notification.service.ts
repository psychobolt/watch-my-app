// angular
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// libs
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Moment } from 'moment';
import * as moment from 'moment';

// app
import { IAppState } from '../../../frameworks/ngrx/state/app.state';

// module
import { NotificationModel } from '../models/notification.model';
import { InitNotificationsAction } from '../actions/notification.action';
import { ReportModel } from '../models/report.model';

@Injectable()
export class NotificationService {

  constructor(
    private http: Http,
    private store: Store<IAppState>
  ) {
    this.store.dispatch(new InitNotificationsAction());
  }

  getNotifcations() : Observable<Array<NotificationModel>> {
    return this.store.select(state => state.monitor.rules.notifications);
  }

  runNotifier(notification: NotificationModel): Observable<{
    notification: NotificationModel, 
    reports: Array<ReportModel>
  }> {
    let duration = moment.duration(notification.interval.duration);
    let nextStartTime: number | Moment;
    if (notification.interval.startTime) {
      let timeNow = moment();
      let currentDayStart = moment([timeNow.year(), timeNow.month(), timeNow.day() - 1]);
      nextStartTime = currentDayStart.add(duration);
    } else {
      nextStartTime = 0;
    }
    return Observable.timer(nextStartTime.valueOf(), duration.asMilliseconds()).timeInterval()
      .flatMap(() => this.store.select(state => state.monitor.endpoints))
      .map(endpoints => endpoints.reduce((reports, endpoint) => {
        if (!endpoint.reports) {
          return reports;
        }
        return [...reports, ...endpoint.reports.filter(report => {
          return notification.ruleTypes.includes(report.rule.type) 
        })];
      }, <Array<ReportModel>>[])).map(reports => {
        return { reports, notification};
      });
  }

  sendEmail() {
    console.log('sending email');
  }
}