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

export function formatTime(time: string) {
   const diff = dayjs().diff(time, 'minute');

   if (diff < 60) {
      return `${diff}m`;
   }

   const diffInHours = dayjs().diff(time, 'hour');

   if (diffInHours < 24) {
      return `${diffInHours}h`;
   }

   const diffInDays = dayjs().diff(time, 'day');

   if (diffInDays < 7) {
      return `${diffInDays}d`;
   }

   if (diffInDays < 365) {
      const diffInWeeks = Math.floor(diffInDays / 7);
      return `${diffInWeeks}w`;
   }

   return `7d+`;
}

export function formatDateTime(dateString: string) {
   const date = dayjs(dateString);
   const now = dayjs();

   if (now.isSame(date, 'day')) {
      return date.format('HH:mm');
   } else {
      return date.format('HH:mm DD MMM, YYYY');
   }
}
