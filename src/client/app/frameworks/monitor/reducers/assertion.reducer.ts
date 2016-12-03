import { 
  EndpointModel,
  RuleModel, 
  ChangeRuleModel, 
  LimitRuleModel,
  ReportModel
} from '../index';

export function assertChange(rule: ChangeRuleModel, oldState: any, newState: any): ReportModel {
  let oldValue = oldState[rule.property];
  let newValue = newState[rule.property];
  if (oldValue === rule.oldValue && newValue === rule.newValue) {
    return generateReport(rule, `Changed ${rule.property} from ${oldValue} to ${newValue}`);
  }
  return null;
}

export function assertLimit(rule: LimitRuleModel, state: any): ReportModel {
  let newValue = state[rule.property];
  if (rule.limit >= newValue) {
    return generateReport(rule, `${rule.property} '${newValue}' is not under ${rule.limit}`);
  }
  return null;
}

function generateReport(rule: RuleModel, message: string): ReportModel {
  return {
      rule,
      message,
      date: new Date(),
      reported: false,
      reportedTo: []
    };
}
