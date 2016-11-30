import { Action } from '@ngrx/store';
import { type } from '../../core/utils/type';
import { CATEGORY } from '../common/category.common';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 * 
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique. 
 */

export const NotificationActionTypes = {
  INIT: type(`[${CATEGORY}] Notifications Init`),
  SEND: type(`[${CATEGORY}] Send Notification`)
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 * 
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class InitNotificationsAction implements Action {
  type = NotificationActionTypes.INIT;
  payload: string = null;
}

export class SendNotificationAction implements Action {
  type = NotificationActionTypes.SEND;
  payload: string = null;
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type NotificationActions
  = InitNotificationsAction
  | SendNotificationAction;
