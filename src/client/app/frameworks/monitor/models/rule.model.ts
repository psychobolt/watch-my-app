import { NotificationModel } from './notification.model';

export interface RuleConfig {
  notifications: NotificationModel[],
  endpoint: RuleModel[];
}

export const RuleModelTypes = {
  CHANGE_RULE: 'ChangeRule',
  LIMIT_RULE: 'LimitRule'
};

export interface ReplaceModel {
  property?: string,
  oldValue?: any,
  newValue: any
}

export interface RuleModel {
  property: string;
  type: string;
  reportType: string;
  replace?: ReplaceModel;
}

export interface ChangeRuleModel extends RuleModel {
  oldValue: string;
  newValue: string;
}

export interface LimitRuleModel extends RuleModel {
  limit: number
}

