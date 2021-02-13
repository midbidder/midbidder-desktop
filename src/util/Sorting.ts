/**
 * @description Implementation of the Fisher-Yates shuffle.
 * @param array
 */
export function shuffle(array: any[]) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  // While not completely random
  while (0 !== currentIndex) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // Swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
