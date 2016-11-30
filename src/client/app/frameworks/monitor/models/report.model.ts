import { RuleModel } from './rule.model';

export const ReportModelType = {
  FIXED: 'Fixed',
  VIOLATION: 'Violation'
}

export class ReportModel {
  rule: RuleModel;
  message: string;
  date: Date;
}
