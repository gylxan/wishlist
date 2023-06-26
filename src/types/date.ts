import parse from 'date-fns/parse';
import dateFnsFormat from 'date-fns/format';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';

export const getParsedDate = (date: string, format = 'yyyy-MM-dd') =>
  parse(date, format, new Date());

export const getFormattedDate = (date: Date) => dateFnsFormat(date, 'dd.MM.yyyy');

export const getDifferenceInDays = (dateFrom: Date, dateTo: Date) =>
  differenceInCalendarDays(dateTo, dateFrom);
