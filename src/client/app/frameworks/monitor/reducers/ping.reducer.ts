import { initialState, IMonitorState, PingActions, PingActionTypes } from '../index';

//TODO seperate into ping endpoint and service reducers
export function reducer(
  state: IMonitorState = initialState,
  action: PingActions
): IMonitorState {
  switch (action.type) {
    case PingActionTypes.DISCONNECTED:
      return (<any>Object).assign({}, state, {
        pingActionStatus: 'OFFLINE'
      });
    case PingActionTypes.PING_SUCCESS:
      return (<any>Object).assign({}, state, {
        endpoints: state.endpoints.map((endpoint) => {
          if (action.payload.value === endpoint.value) { 
            return (<any>Object).assign({}, endpoint, {
              status: 'ONLINE'
            });
          }
          return endpoint;
        })
      });
    case PingActionTypes.PING_FAILED:
      return (<any>Object).assign({}, state, {
        endpoints: state.endpoints.map((endpoint) => {
          if (action.payload.value === endpoint.value) { 
            return (<any>Object).assign({}, endpoint, {
              status: 'OFFLINE'
            });
          }
          return endpoint;
        })
      });
    default:
      return state;
  }
}
