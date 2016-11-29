// angular
import { Injectable } from '@angular/core';

//libs
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

// app
import { IAppState } from '../../../frameworks/ngrx/state/app.state';

// module
import { EndpointViewModel } from '../index';
import { RuleModel, ChangeRuleModel, RuleModelTypes } from '../models/rule';
import { ReportModel } from '../models/report';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class EndpointValidatorService {

  constructor(
    private notificationService: NotificationService,
    private store: Store<IAppState>
  ) {
  }

  validate() {
    let oldEndpoints;
    this.store.select(state => state.monitor.rules).subscribe(rules => 
      this.store.select(state => state.monitor.endpoints)
        .map(endpoints => {
          if (!oldEndpoints) {
            oldEndpoints = endpoints;
            return <Array<ReportModel>>[];
          }
          return this.assertChanges(oldEndpoints, endpoints, rules);
        }));
  }

  assertChanges(
    oldEndpoints: EndpointViewModel[], 
    newEndpoints: EndpointViewModel[], 
    rules: RuleModel[]) : ReportModel[] {
    let reports = <Array<ReportModel>>[];
    newEndpoints.forEach(endpoint => {
        let oldEndpoint = oldEndpoints.find(oldEndpoint => oldEndpoint.id === endpoint.id);
        if (oldEndpoint) {
          return;
        }
        Object.keys(newEndpoints).forEach(property => {
          rules.forEach(rule => {
            if (rule.type === RuleModelTypes.CHANGE_RULE) {
              let report = this.assertChange(rule as ChangeRuleModel, oldEndpoint, endpoint);
              if (rule.reportType && report) {
                reports = [...reports, report];
              }
            }
          });
        });
    });
    return reports;
  }

  private assertChange(rule: ChangeRuleModel, oldState: any, newState: any): ReportModel {
    let oldValue = oldState[rule.property];
    let newValue = newState[rule.property];
    if (oldValue === rule.oldValue && newValue === rule.newValue) {
      return {
        rule,
        message: `Changed value from '${oldValue}' to '${newValue}'`
      };
    }
    return null;
  }
  
}
