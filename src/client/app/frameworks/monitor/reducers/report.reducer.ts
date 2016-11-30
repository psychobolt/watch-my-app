import { Action } from '@ngrx/store';
import { 
    EndpointViewModel, 
    IMonitorState, 
    PingActionTypes,
    ChangeRuleModel,
    RuleModelTypes,
    assertChange
} from '../index';

export function endpointReportReducer(state: IMonitorState, action: Action, endpoint: EndpointViewModel) {
  state.rules.forEach(rule => {
    if (rule.type === RuleModelTypes.CHANGE_RULE) {
        let changeRule = rule as ChangeRuleModel;
        switch(action.type) {
          case PingActionTypes.PING_SUCCESS:
            assertChange(changeRule, endpoint, 'ONLINE');
            break;
          case PingActionTypes.PING_FAILED:
            assertChange(changeRule, endpoint, 'OFFLINE');
            break;
          default:
        }
    }
  });
  return endpoint;
}
