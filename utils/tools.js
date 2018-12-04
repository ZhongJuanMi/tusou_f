export const getRandom = (a, b) => {
  if (!b) {
    b = a
    a = 0
  }
  return Math.floor(Math.random() * (b - a)) + a
}
