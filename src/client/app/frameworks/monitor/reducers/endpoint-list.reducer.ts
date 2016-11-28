import { IMonitorState, EndpointListActions, EndpointsSyncedAction, EndpointListActionTypes, initialState } from '../index';

export function reducer(
  state: IMonitorState = initialState,
  action: EndpointListActions
): IMonitorState {
  switch (action.type) {
    case EndpointListActionTypes.ENDPOINTS_SYNCED:
      action = action as EndpointsSyncedAction;
      if (state.endpoints == null) {
        return Object.assign({}, state, {
          endpoints: action.payload
        });
      } else {
        return Object.assign({}, state, {
          endpoints: action.payload.map(endpoint => {
            let oldEndpoint = state.endpoints.find(old => old.id == endpoint.id)
            return oldEndpoint ? Object.assign({}, oldEndpoint, endpoint) : endpoint;
          })
        });
      }
    default:
      return state;
  }
}