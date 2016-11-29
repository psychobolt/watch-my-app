import { EndpointViewModel } from '../index';
import { RuleModel } from '../models/rule';

export interface IMonitorState {
  endpoints: Array<EndpointViewModel>;
  rules: Array<RuleModel>;
  pingServiceStatus: string;
}

export const initialState: IMonitorState = {
  rules: <Array<RuleModel>>[],
  endpoints: <Array<EndpointViewModel>>[],
  pingServiceStatus: 'OFFLINE'
};
