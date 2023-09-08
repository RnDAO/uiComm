import moment from 'moment';

export function transformToMidnightUTC(
  dateStr: string | Date | moment.Moment
): string {
  const modifiedDate = moment.utc(dateStr).startOf('day');
  return modifiedDate.format('YYYY-MM-DD[T]HH:mm:ss[Z]');
}

export function transformToEndOfUTC(
  dateStr: string | Date | moment.Moment
): string {
  const modifiedDate = moment.utc(dateStr).endOf('day');
  return modifiedDate.format('YYYY-MM-DD[T]HH:mm:ss[Z]');
}
