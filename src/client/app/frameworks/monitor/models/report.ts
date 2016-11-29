import { RuleModel } from './rule';

export interface ReportModelType {
  FIXED: string;
  VIOLATION: string;
}

export const ReportModelType : ReportModelType = {
  FIXED: 'Fixed',
  VIOLATION: 'Violation'
}

export class ReportModel {
  rule: RuleModel;
  message: string;
}
