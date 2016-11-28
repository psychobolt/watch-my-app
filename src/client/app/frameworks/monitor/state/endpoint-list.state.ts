import { Observable } from 'rxjs/Observable';
import { IMonitorState } from './monitor.state';

export interface EndpointModel {
  id: string;
  value: string;
}

export interface EndpointViewModel extends EndpointModel {
  status?: string;
}

export function getEndpoints(state$: Observable<IMonitorState>) {
  return state$.select(state => state.endpoints);
}