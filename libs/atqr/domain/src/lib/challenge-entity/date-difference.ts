const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
export function dateDiff(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY)
}

// const today = new Date()
// const deadline = new Date(2022, 7, 23)

// function getDeadline() {
//   if (dateDiff(deadline, today) > 1) {
//     return deadline;
//   } else {
//     throw new Error('Selecione uma data futura');
//   }
// }

// console.log(getDeadline())
