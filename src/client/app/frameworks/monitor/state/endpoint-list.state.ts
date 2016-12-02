import { Observable } from 'rxjs/Observable';
import { IMonitorState } from './monitor.state';

export function getEndpoints(state$: Observable<IMonitorState>) {
  return state$.select(state => state.endpoints);
}
