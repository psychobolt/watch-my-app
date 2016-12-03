// angular
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// libs
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { TimeInterval } from 'rxjs/operator/timeInterval';
import { Moment } from 'moment';
import * as moment from 'moment';

// app
import { IAppState } from '../../../frameworks/ngrx/state/app.state';
import { Analytics, AnalyticsService } from '../../analytics/index';

// module
import { 
  EndpointModel,
  NotificationModel,
  InitNotificationsAction,
  NotificationSentAction,
  NotificationActionTypes,
  ReportModel,
  CATEGORY 
} from '../index';
import { EndpointListService } from '../services/endpoint-list.service';

@Injectable()
export class NotificationService extends Analytics  {

  constructor(
    private http: Http,
    private store: Store<IAppState>,
    public analytics: AnalyticsService,
    private endpointListService: EndpointListService
  ) {
    super(analytics);
    this.category = CATEGORY;
    this.store.dispatch(new InitNotificationsAction());
  }

  getNotifcations() : Observable<Array<NotificationModel>> {
    return this.store.select(state => state.monitor.rules.notifications);
  }

  runNotifier(notification: NotificationModel) {
    this.getInterval(notification).subscribe((x) => {
      this.endpointListService.getStoredEndpoints()
        .subscribe(endpoints => {
          this.sendNotification(notification, endpoints.reduce((reports, endpoint) => endpoint.reports ? 
            [...reports, ...endpoint.reports.filter(report => notification.reportTypes
              .find(ruleType => ruleType === report.rule.reportType))] 
            : [], <Array<ReportModel>>[]));
        });
    });
  }

  private getInterval(notification: NotificationModel): Observable<TimeInterval<number>> {
    let duration = moment.duration(notification.interval.duration);
    let nextStartTime: number | Moment;
    if (notification.interval.startTime) {
      let timeNow = moment();
      let currentDayStart = moment([timeNow.year(), timeNow.month(), timeNow.day() - 1]);
      nextStartTime = currentDayStart.add(duration);
    } else {
      nextStartTime = 0;
    }
    return Observable.timer(nextStartTime.valueOf(), duration.asMilliseconds()).timeInterval();
  }

  private sendNotification(notification: NotificationModel, reports: ReportModel[]) {
    if (!reports.length) {
      return;
    }
    this.track(NotificationActionTypes.SEND, {label: JSON.stringify(reports)});
    this.store.dispatch(new NotificationSentAction({notification, reports}));
  }
}