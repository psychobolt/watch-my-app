// libs
import { Observable } from 'rxjs/Observable';

// app
import { IMonitorState } from './monitor.state';

export function getPingServiceState(state$: Observable<IMonitorState>) {
    return state$.select(state => state.pingServiceStatus);
}