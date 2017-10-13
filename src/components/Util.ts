import * as fns from 'date-fns';

export const formatTimestamp = (unixtime: number): string => {
  const d: Date = new Date(unixtime / 1000);
  return `${fns.format(d, 'MM/DD/YY')} (${fns.distanceInWordsToNow(d)})`;
};
