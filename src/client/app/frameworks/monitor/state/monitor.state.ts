// libs
import { Observable } from 'rxjs/Observable';
/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import { compose } from '@ngrx/core/compose';

// app
import { IAppState } from '../../ngrx/state/app.state';

// module
import { 
  EndpointModel,
  RuleConfig,
  RuleModel,
  PingStatus
} from '../models/index';

import * as fromEndpointList from './endpoint-list.state';
import * as fromPing from './ping.state';

export interface IMonitorState {
  endpoints: Array<EndpointModel>;
  rules: RuleConfig;
  pingServiceStatus: string;
}

let RULE_CONFIG: RuleConfig = require('../../../../assets/rules.json!json');
export const initialState: IMonitorState = {
  rules: RULE_CONFIG,
  endpoints: <Array<EndpointModel>>[],
  pingServiceStatus: 'ACTIVE'
};

export function getMonitorState(state$: Observable<IAppState>) {
  return state$.select(s => s.monitor);
}

export const getEndpoints = compose(fromEndpointList.getEndpoints, getMonitorState);
export const getPingServiceStatus = compose(fromPing.getPingServiceState, getMonitorState);
