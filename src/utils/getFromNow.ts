import dayjs from 'dayjs';

export function getFromNow(dateString: string) {
   const now = dayjs();
   const date = dayjs(dateString);

   if (now.diff(date, 'hour') < 1) {
      return date.fromNow();
   } else if (now.diff(date, 'day') < 7) {
      return date.format('dddd');
   } else if (now.diff(date, 'year') < 1) {
      return date.format('DD MMM');
   } else {
      return date.format('DD MM YYYY');
   }
}
