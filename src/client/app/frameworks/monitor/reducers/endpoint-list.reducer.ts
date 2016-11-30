import {
  EndpointListActions,
  EndpointsSyncedAction,
  EndpointListActionTypes, 
} from '../actions/index';
import { 
  IMonitorState, 
  initialState 
} from '../state/index';
import { EndpointModel } from '../models/endpoint.model';

export function reducer(
  state: IMonitorState = initialState,
  action: EndpointListActions
): IMonitorState {
  switch (action.type) {
    case EndpointListActionTypes.ENDPOINTS_SYNCED:
      let syncedAction = action as EndpointsSyncedAction;
      if (!state.endpoints) {
        return (<any>Object).assign({}, state, {
          endpoints: syncedAction.payload
        });
      } else {
        return Object.assign({}, state, {
          endpoints: syncedAction.payload.map(endpoint => {
            let oldEndpoint = state.endpoints.find(old => old.id === endpoint.id);
            return oldEndpoint ? Object.assign({}, oldEndpoint, endpoint) : endpoint;
          })
        });
      }
    default:
      return state;
  }
}
