import { EndpointViewModel } from '../index';

export interface IMonitorState {
  endpoints: Array<EndpointViewModel>;
  pingServiceStatus: string;
}

export const initialState: IMonitorState = {
  endpoints: <Array<EndpointViewModel>>[],
  pingServiceStatus: 'OFFLINE'
}