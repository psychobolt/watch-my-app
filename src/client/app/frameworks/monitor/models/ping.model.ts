import { EndpointModel } from './endpoint.model';

export interface PingResultModel {
  endpoint: EndpointModel;
  ping: number;
}

export const PingStatus = {
  DISCONNECTED: 0,
  FAILED: -1,
  UNSUPPORTED: -2,
  STALE: 3
};