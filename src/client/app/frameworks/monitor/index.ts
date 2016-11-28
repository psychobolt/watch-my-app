import { OpaqueToken } from '@angular/core';
import { IMonitorState } from './state/monitor.state';
import * as _ from 'lodash';

// components

// services
export * from './services/database.service';
export * from './services/endpoint-list.service';
export * from './services/ping.service';

// actions
export * from './actions/endpoint-list.action';
export * from './actions/ping.action';

// effects
export * from './effects/endpoint-list.effect';
export * from './effects/ping.effect';

// reducers
import * as fromEndpoints from './reducers/endpoint-list.reducer';
import * as fromPing from './reducers/ping.reducer';
export function reducer (state: IMonitorState, action: any) {
  return fromPing.reducer(fromEndpoints.reducer(state, action), action);
}

// state
export * from './state/monitor.state';
export * from './state/endpoint-list.state';