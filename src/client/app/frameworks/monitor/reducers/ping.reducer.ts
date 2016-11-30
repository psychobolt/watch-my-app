import { initialState, IMonitorState } from '../state/index';
import { 
  PingActions, 
  PingSuccessAction, 
  PingFailedAction, 
  PingActionTypes,
  PingUnsupportedAction
} from '../actions/index';
import { endpointReportReducer } from './report.reducer';

export function reducer(
  state: IMonitorState = initialState,
  action: PingActions
): IMonitorState {
  switch (action.type) {
    case PingActionTypes.DISCONNECTED:
      return Object.assign({}, state, {
        pingActionStatus: 'DISCONNECTED'
      });
    case PingActionTypes.PING_UNSUPPORTED:
    case PingActionTypes.PING_SUCCESS:
    case PingActionTypes.PING_FAILED:
      action = action as PingSuccessAction | PingFailedAction | PingUnsupportedAction;
      let endpoint = action.payload.endpoint;
      return Object.assign({}, state, {
        pingActionStatus: 'ACTIVE',
        endpoints: state.endpoints.map((storedEndpoint) => 
          storedEndpoint.value === endpoint.value ?
            endpointReportReducer(state, action, endpoint) : storedEndpoint)
      });
    default:
      return state;
  }
}
