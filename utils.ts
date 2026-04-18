export type Unpacked<T> = T extends (infer U)[] ? U : T;

export const groupByCount = <T>(input: Array<T>, numPerGroup: number): Array<Array<T>> => {
  if (input.length < numPerGroup) return [];
  return [
    input.slice(0, numPerGroup),
    ...groupByCount(input.slice(numPerGroup, undefined), numPerGroup),
  ];
};

export const groupBy = <T, V>(input: Array<T>, keyFn: (inp: T) => V) => {
  return Array.from(
    input
      .reduce((prev, cur) => {
        const keyV = keyFn(cur);
        if (prev.has(keyV)) prev.get(keyV)?.push(cur);
        else prev.set(keyV, [cur]);
        return prev;
      }, new Map<V, Array<T>>())
      .values(),
  );
};

export const notEmpty = <TValue>(value: TValue | null | undefined): value is TValue =>
  value !== null && value !== undefined;

export function randomFromList<T>(input: Array<T>): T {
  const index = Math.floor(Math.random() * input.length);
  // index is always in [0, input.length - 1] so the element is always defined
  return input[index] as T;
}

export const range = (length: number) => [...Array.from(Array(length).keys())];
