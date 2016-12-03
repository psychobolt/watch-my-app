export interface NotificationModel {
  interval: Interval,
  reportTypes: string[],
  emails: string[];
}

export interface Interval {
  startTime?: number | string
  duration: string | Duration
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