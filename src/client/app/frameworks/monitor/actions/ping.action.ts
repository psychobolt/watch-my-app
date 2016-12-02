import { Action } from '@ngrx/store';
import { type } from '../../core/utils/type';
import { CATEGORY } from '../common/category.common';
import { EndpointModel } from '../models/endpoint.model';
import { PingResultModel } from '../models/ping.model'; 

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 * 
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique. 
 */

export const PingActionTypes =  {
  PING_ENDPOINT: type(`[${CATEGORY}] Ping Endpoint`),
  PING_COMPLETED: type(`[${CATEGORY}] Ping Completed`),
  PING_SUCCESS: type(`[${CATEGORY}] Ping Success`),
  PING_FAILED: type(`[${CATEGORY}] Ping Failed`),
  PING_UNSUPPORTED: type(`[${CATEGORY}] Ping Unsupported`),
  PING_RETRY: type(`[${CATEGORY}] Ping Retry`),
  DISCONNECTED: type(`[${CATEGORY}] Disconnected`)
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 * 
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

export class PingEndpointAction implements Action {
  type = PingActionTypes.PING_ENDPOINT;
  constructor(public payload: EndpointModel) { }
}

export class PingCompletedAction implements Action { 
  type = PingActionTypes.PING_COMPLETED;
  constructor(public payload: EndpointModel = null) { }
}

export class PingSuccessAction implements Action  {
  type = PingActionTypes.PING_SUCCESS;
  constructor(public payload: PingResultModel) { }
}

export class PingFailedAction implements Action {
  type = PingActionTypes.PING_FAILED;
  constructor(public payload: PingResultModel) { }
}

export class PingUnsupportedAction implements Action {
  type = PingActionTypes.PING_UNSUPPORTED;
  constructor(public payload: PingResultModel) { }
}

export class PingRetryAction implements Action {
  type = PingActionTypes.PING_RETRY;
  constructor(public payload: EndpointModel) { }
}

export class Disconnected implements Action {
  type = PingActionTypes.DISCONNECTED;
  constructor(public payload: PingResultModel) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type PingActions 
  = PingEndpointAction
  | PingEndpointAction
  | PingSuccessAction
  | PingFailedAction
  | PingUnsupportedAction
  | PingRetryAction
  | Disconnected;
