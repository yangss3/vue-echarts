/* eslint-disable no-empty */
// function wrapWithArray<T>(obj: T[]): T[]
export function wrapWithArray<T, K extends NonNullable<T>>(obj: T | T[]): K[];
export function wrapWithArray(obj: undefined | null): [];
export function wrapWithArray (obj: any): any {
  if (obj) {
    return Array.isArray(obj) ? obj : [obj]
  } else {
    return []
  }
}

export function multiply (n1: number | string, n2: number | string) {
  let m = 0
  n1 = n1.toString()
  n2 = n2.toString()
  try {
    m += n1.split('.')[1].length
  } catch (e) {}
  try {
    m += n2.split('.')[1].length
  } catch (e) {}
  return (Number(n1.replace('.', '')) * Number(n2.replace('.', ''))) / 10 ** m
}
