import { Action } from '@ngrx/store';
import { 
    EndpointModel,
    ChangeRuleModel,
    LimitRuleModel,
    RuleModelTypes,
    RuleModel,
    ReportModel,
    ReportModelType,
    IMonitorState,
    PingActionTypes,
    NotificationSentAction,
    NotificationActionTypes
} from '../index';
import * as assert from './assertion.reducer';

export function reducer(state: IMonitorState, action: NotificationSentAction) {
  switch (action.type) {
    case NotificationActionTypes.SENT:
      return Object.assign({}, state, {
        endpoints: state.endpoints.map(endpoint => {
          let reports = [];
          endpoint.reports.forEach(report => {
            let emails = state.rules.notifications
              .reduce((emails, notification) => [...emails, ...notification.emails], [])
              .filter(email => report.reportedTo.indexOf(email) === -1);
            let notificationEmails = action.payload.notification.emails.filter(email => emails.indexOf(email) === -1);
            if (emails.length && notificationEmails.length) {
              reports = [...reports, Object.assign({}, report, {
                reported: true,
                reportedTo: [...report.reportedTo, ...action.payload.notification.emails]
              })];
            }
          });
          return Object.assign({}, endpoint, {
            reports: reports
          });
        })
      });
    default:
      return state;
  }
}

export function endpointReportReducer(state: IMonitorState, action: Action, endpoint: EndpointModel, newEndpoint: EndpointModel) {
  let reports = endpoint.reports ? [...endpoint.reports] : [];
  state.rules.endpoint.forEach(rule => {
    let report: ReportModel;
    if (rule.replace) {
      report = applyAssertions(rule, endpoint, applyReplacements(rule, newEndpoint));
    } else {
      report = applyAssertions(rule, endpoint, newEndpoint);
    }
    if (report) {
      reports = [...reports, report];
    }
  });
  return Object.assign({}, newEndpoint, {reports});
}

function applyReplacements(rule: RuleModel, endpoint: EndpointModel) {
  if (!rule.replace.oldValue 
      || rule.replace.oldValue === endpoint[rule.replace.property || rule.property]) {
    return Object.assign({}, endpoint, {
      [rule.property]: rule.replace.newValue
    });
  }
  return endpoint;
}

function applyAssertions(rule: RuleModel, oldEndpoint: EndpointModel, newEndpoint: EndpointModel): ReportModel {
  let report: ReportModel;
  switch (rule.type) {
    case RuleModelTypes.CHANGE_RULE:
      let changeRule = rule as ChangeRuleModel;
      report = assert.assertChange(changeRule, oldEndpoint, newEndpoint);
      break;
    case RuleModelTypes.LIMIT_RULE:
      let limitRule = rule as LimitRuleModel;
      report = assert.assertLimit(limitRule, newEndpoint);
      break;
  }
  return report;
}