// libs
import * as _ from 'lodash';
import { Action } from '@ngrx/store';

// module
import { IMonitorState } from '../state/monitor.state';
import * as fromEndpoints from './endpoint-list.reducer';
import * as fromPing from './ping.reducer';
import * as fromReport from './report.reducer';
import { PingActions } from '../actions/ping.action';

export function reducer(state: IMonitorState, action: any) {
  return _.flow(
    _.curryRight(fromEndpoints.reducer)(action),
    _.curryRight(fromPing.reducer)(action),
    _.curryRight(fromReport.reducer)(action)
  )(state);
}
