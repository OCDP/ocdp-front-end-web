export default function <T>(arrayA: T[], arrayB: T[]) {
  return arrayA
    .filter((a) => !arrayB.includes(a))
    .concat(arrayB.filter((b) => !arrayA.includes(b)));
}