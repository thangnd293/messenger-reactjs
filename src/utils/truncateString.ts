export function truncateString(str: string, maxLength: number) {
   if (str.length > maxLength) {
      str = str.substring(0, maxLength).slice(0, -1) + '...';
   }
   return str;
}
