export interface NotificationModel {
  interval: Interval,
  ruleTypes: string[],
  emails: string[];
}

export interface Interval {
  startTime?: number | string
  duration: Duration
}

export interface Duration {
  seconds?: number,
  minutes?: number,
  hours?: number,
  days?: number,
  weeks?: number,
  months?: number,
  years?: number
};