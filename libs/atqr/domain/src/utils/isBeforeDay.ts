export function isBeforeDay(date1: Date, date2: Date): boolean {
  if(date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() < date2.getDate() ) {
      return true
  }
  if(date1.getFullYear() == date2.getFullYear() && date1.getMonth() < date2.getMonth() ) {
      return true
  }
  if(date1.getFullYear() < date2.getFullYear()) {
      return true
  }
  return false;
}
