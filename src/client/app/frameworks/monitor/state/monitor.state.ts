import { EndpointModel } from '../models/endpoint.model';
import { RuleConfig, RuleModel } from '../models/rule.model';
let RULE_CONFIG: RuleConfig = require('../../../../assets/rules.json!json');

export interface IMonitorState {
  endpoints: Array<EndpointModel>;
  rules: RuleConfig;
  pingServiceStatus: string;
}

export const initialState: IMonitorState = {
  rules: RULE_CONFIG,
  endpoints: <Array<EndpointModel>>[],
  pingServiceStatus: 'OFFLINE'
};
