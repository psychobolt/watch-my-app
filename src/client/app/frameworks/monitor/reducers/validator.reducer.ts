import { ChangeRuleModel } from '../models/rule';
import { ReportModel } from '../models/report';

export function assertChange(rule: ChangeRuleModel, state: any, newValue: any): ReportModel {
  let oldValue = state[rule.property];
  if (oldValue === rule.oldValue && newValue === rule.newValue) {
    return {
      rule,
      message: `Changed value from '${oldValue}' to '${newValue}'`
    };
  }
  return null;
}
