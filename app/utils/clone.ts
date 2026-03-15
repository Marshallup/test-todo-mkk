export function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export function isDeepEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}
