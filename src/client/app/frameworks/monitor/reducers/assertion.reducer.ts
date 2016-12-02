import { EndpointModel } from '../models/endpoint.model';
import { ChangeRuleModel, LimitRuleModel } from '../models/rule.model';
import { ReportModel } from '../models/report.model';

export function assertChange(rule: ChangeRuleModel, oldState: any, newState: any) {
  let oldValue = oldState[rule.property];
  let newValue = newState[rule.property];
  if (oldValue === rule.oldValue && newValue === rule.newValue) {
    return {
      rule,
      message: `Changed ${rule.property} from ${oldValue} to ${newValue}`,
      date: new Date()
    };
  }
  return null;
}

export function assertLimit(rule: LimitRuleModel, state: any): ReportModel {
  let newValue = state[rule.property];
  if (rule.limit >= newValue) {
    return {
      rule,
      message: `${rule.property} '${newValue}' is not under ${rule.limit}`,
      date: new Date()
    };
  }
  return null;
}
