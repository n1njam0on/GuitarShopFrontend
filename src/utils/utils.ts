
export function countArrayLength(itemsAllNumber: number, itemsPerScrinNumber: number): number {
  if (itemsPerScrinNumber > itemsAllNumber) {
    return 0;
  }
  return 1 + countArrayLength((itemsAllNumber - itemsPerScrinNumber), itemsPerScrinNumber);
}
