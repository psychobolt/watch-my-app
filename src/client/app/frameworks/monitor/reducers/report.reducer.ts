import { Action } from '@ngrx/store';
import { 
    EndpointModel,
    EndpointStatus,
    ChangeRuleModel,
    LimitRuleModel,
    RuleModelTypes,
    RuleModel,
    ReportModel,
    ReportModelType
} from '../models/index';
import { IMonitorState } from '../state/monitor.state';
import * as assert from './assertion.reducer';
import { PingActionTypes } from '../actions/ping.action';

export function reducer(state: IMonitorState, action: Action) {
  return state;
}

export function endpointReportReducer(state: IMonitorState, action: Action, endpoint: EndpointModel) {
  let newEndpoint = transform(endpoint, action);
  let reports = endpoint.reports ? [...endpoint.reports] : [];
  state.rules.endpoint.forEach(rule => {
    let report: ReportModel;
    if (rule.replace) {
      report = applyAssertions(rule, endpoint, applyReplacements(rule, newEndpoint));
    } else {
      report = applyAssertions(rule, endpoint, newEndpoint);
    }
    if (report && !canSkipReport(report, endpoint)) {
      reports = [...reports, report];
    }
  });
  return Object.assign({}, newEndpoint, {reports});
}

function transform(endpoint: EndpointModel, action: Action) {
  let status;
  switch (action.type) {
    case PingActionTypes.PING_SUCCESS:
      status = EndpointStatus.ONLINE
      break;
    case PingActionTypes.PING_FAILED:
      status = EndpointStatus.OFFLINE;
      break;
    default:
      status = EndpointStatus.PINGING;
  }
  return Object.assign({}, endpoint, {status});
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

function canSkipReport(report: ReportModel, endpoint: EndpointModel): boolean {
  switch (report.rule.type) {
      case ReportModelType.FIXED:
        let resolved = endpoint.reports.filter(oldReport => {
          oldReport.rule.type === report.rule.type
          && oldReport.rule.property === report.rule.property
          && oldReport.rule.reportType === ReportModelType.VIOLATION 
          && report.rule.reportType === ReportModelType.FIXED
          switch (report.rule.reportType) {
            case RuleModelTypes.CHANGE_RULE:
              let oldRule = oldReport.rule as ChangeRuleModel;
              let newRule = report.rule as ChangeRuleModel;
              if (oldRule.newValue === newRule.oldValue) {
                return true;
              }
              return false;
            default:
              return false;
          }
        });
        if (!resolved) {
          return true;
        }
        return false;
    default:
      return false
  }
}