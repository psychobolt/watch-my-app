import { IMonitorState } from './state/monitor.state';

// components

// services
export * from './services/database.service';
export * from './services/endpoint-list.service';
export * from './services/ping.service';
export * from './services/notification.service';

// actions
export * from './actions/endpoint-list.action';
export * from './actions/ping.action';

// effects
export * from './effects/endpoint-list.effect';
export * from './effects/ping.effect';

// reducers
import * as fromEndpoints from './reducers/endpoint-list.reducer';
import * as fromPing from './reducers/ping.reducer';
export * from './reducers/validator.reducer';
export function reducer (state: IMonitorState, action: any) {
  return fromPing.reducer(fromEndpoints.reducer(state, action), action);
}

// state
export * from './state/monitor.state';
export * from './state/endpoint-list.state';

// models
export * from './models/report';
export * from './models/rule';
