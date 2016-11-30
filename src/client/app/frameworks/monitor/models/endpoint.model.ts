import { ReportModel } from '../models/report.model';

export const EndpointStatus = {
  PINGING: 'PINGING',
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE',
  HIGH_LATENCY: 'HIGH_LATENCY'
};

export const EndpointType = {
  HEAD: 'HEAD',
  GET: 'GET'
}

export interface EndpointModel {
  id: string;
  value: string;
  status?: string;
  reports?: ReportModel[],
  ping?: number;
  type: string;
}