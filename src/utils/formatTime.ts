import dayjs from 'dayjs';

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
