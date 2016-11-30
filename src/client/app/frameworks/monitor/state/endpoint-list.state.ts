import { Observable } from 'rxjs/Observable';
import { IMonitorState } from './monitor.state';
import { ReportModel } from '../models/report';

export interface EndpointModel {
  id: string;
  value: string;
}

export interface EndpointViewModel extends EndpointModel {
  status?: string;
  report?: ReportModel
}

export function getEndpoints(state$: Observable<IMonitorState>) {
  return state$.select(state => state.endpoints);
}
