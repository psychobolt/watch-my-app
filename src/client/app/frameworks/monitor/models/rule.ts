export interface IRuleModelTypes {
  CHANGE_RULE: string;
}

export const RuleModelTypes: IRuleModelTypes = {
  CHANGE_RULE: 'ChangeRule'
};

export class RuleModel {
  property: string;
  type: string;
  reportType: string;
}

export class ChangeRuleModel extends RuleModel {
  oldValue: string;
  newValue: string;
}
