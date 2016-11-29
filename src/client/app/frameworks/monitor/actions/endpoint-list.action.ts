import { Action } from '@ngrx/store';
import { type } from '../../core/utils/type';
import { CATEGORY } from '../common/category.common';
import { EndpointModel } from '../state/endpoint-list.state';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 * 
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique. 
 */
export interface IEndpointListActions {
  INIT: string;
  INIT_FAILED: string;
  ADD: string;
  UPDATE: string;
  ENDPOINT_ADDED: string;
  ENDPOINT_UPDATED: string;
  ENDPOINTS_SYNCED: string;
  VALIDATE_ENDPOINTS: string;
}

export const EndpointListActionTypes: IEndpointListActions = {
  INIT: type(`[${CATEGORY}] Endpoint List Init`),
  INIT_FAILED: type(`[${CATEGORY}] Endpoint List Init Failed`),
  ADD: type(`[${CATEGORY}] Add Endpoint`),
  UPDATE: type(`[${CATEGORY}] Update Endpoint`),
  ENDPOINT_ADDED: type(`[${CATEGORY}] Endpoint Added`),
  ENDPOINT_UPDATED: type(`[${CATEGORY}] Endpoint Updated`),
  ENDPOINTS_SYNCED: type(`[${CATEGORY}] Endpoints Synced`),
  VALIDATE_ENDPOINTS: type(`[${CATEGORY}] Validate Endpoints`)
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 * 
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class InitEndpointsAction implements Action {
  type = EndpointListActionTypes.INIT;
  payload: string = null;
}

export class InitEndpointsFailedAction implements Action {
  type = EndpointListActionTypes.INIT_FAILED;
  payload: string = null;
}

export class EndpointsSyncedAction implements Action {
  type = EndpointListActionTypes.ENDPOINTS_SYNCED;

  constructor(public payload: Array<EndpointModel>) { }
}

export class AddAction implements Action {
  type = EndpointListActionTypes.ADD;
  
  constructor(public payload: string) { }
}

export class UpdateAction implements Action {
  type = EndpointListActionTypes.UPDATE;

  constructor(public payload: EndpointModel) { }
}

export class EndpointAddedAction implements Action {
  type = EndpointListActionTypes.ENDPOINT_ADDED;

  constructor(public payload: EndpointModel) { }
}

export class EndpointUpdatedAction implements Action {
  type = EndpointListActionTypes.ENDPOINT_UPDATED;

  constructor(public payload: EndpointModel) { }
}

export class ValidateEndpointsAction implements Action {
  type = EndpointListActionTypes.VALIDATE_ENDPOINTS;
  payload: string = null;
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type EndpointListActions
  = InitEndpointsAction
  | InitEndpointsFailedAction
  | AddAction
  | UpdateAction
  | EndpointAddedAction
  | EndpointUpdatedAction
  | EndpointsSyncedAction
  | ValidateEndpointsAction;
