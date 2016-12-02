import { 
  initialState, 
  IMonitorState,
  EndpointStatus,
  PingActions, 
  PingStatus,
  PingSuccessAction, 
  PingFailedAction, 
  PingActionTypes,
  Disconnected,
  PingUnsupportedAction
} from '../index';
import { endpointReportReducer } from './report.reducer';

export function reducer(
  state: IMonitorState = initialState,
  action: PingSuccessAction | PingFailedAction | PingUnsupportedAction | Disconnected
): IMonitorState {
  switch (action.type) {
    case PingActionTypes.DISCONNECTED:
      return Object.assign({}, state, {
        pingServiceStatus: 'DISCONNECTED'
      });
    case PingActionTypes.PING_UNSUPPORTED:
    case PingActionTypes.PING_SUCCESS:
    case PingActionTypes.PING_FAILED:
      let endpoint = action.payload.endpoint;
      let pingServiceStatus = state.pingServiceStatus;
      let endpoints = state.endpoints.map((storedEndpoint) => {
        if (storedEndpoint.value === endpoint.value) {
          let status;
          switch (action.type) {
            case PingActionTypes.PING_SUCCESS:
              status = EndpointStatus.ONLINE
              break;
            case PingActionTypes.PING_FAILED:
              status = EndpointStatus.OFFLINE;
              break;
            default:
              status = EndpointStatus.PINGING;
          }
          let newEndpoint =  Object.assign({}, endpoint, {
            status,
            ping: action.payload.ping
          });
          storedEndpoint = endpointReportReducer(state, action, storedEndpoint, newEndpoint);
          if (storedEndpoint.value.indexOf('localhost') === -1) { //TODO proxy should return if endpoint is localhost
            pingServiceStatus = 'ACTIVE';
          }
        }
        return storedEndpoint;
      });
      return Object.assign({}, state, {pingServiceStatus, endpoints});
    default:
      return state;
  }
}
