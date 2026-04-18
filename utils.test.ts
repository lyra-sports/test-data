import { describe, it, expect } from 'vitest';
import { groupBy, groupByCount, notEmpty, randomFromList, range } from './utils';

describe('range', () => {
  it('returns an empty array for length 0', () => {
    expect(range(0)).toEqual([]);
  });

  it('returns [0] for length 1', () => {
    expect(range(1)).toEqual([0]);
  });

  it('returns sequential integers starting from 0', () => {
    expect(range(5)).toEqual([0, 1, 2, 3, 4]);
  });
});

describe('notEmpty', () => {
  it('returns false for null', () => {
    expect(notEmpty(null)).toBe(false);
  });

  it('returns false for undefined', () => {
    expect(notEmpty(undefined)).toBe(false);
  });

  it('returns true for a non-null value', () => {
    expect(notEmpty(0)).toBe(true);
    expect(notEmpty('')).toBe(true);
    expect(notEmpty(false)).toBe(true);
    expect(notEmpty({})).toBe(true);
  });

  it('acts as a type guard when used with filter', () => {
    const arr: (number | null | undefined)[] = [1, null, 2, undefined, 3];
    const result: number[] = arr.filter(notEmpty);
    expect(result).toEqual([1, 2, 3]);
  });
});

describe('groupByCount', () => {
  it('returns empty array when input is smaller than group size', () => {
    expect(groupByCount([1, 2], 3)).toEqual([]);
  });

  it('returns empty array for empty input', () => {
    expect(groupByCount([], 2)).toEqual([]);
  });

  it('groups elements into chunks of the given size', () => {
    expect(groupByCount([1, 2, 3, 4], 2)).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  it('drops a trailing partial group', () => {
    expect(groupByCount([1, 2, 3, 4, 5], 2)).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  it('returns one group when input equals group size', () => {
    expect(groupByCount([1, 2, 3], 3)).toEqual([[1, 2, 3]]);
  });
});

describe('groupBy', () => {
  it('returns an empty array for empty input', () => {
    expect(groupBy([], () => 'key')).toEqual([]);
  });

  it('groups items that share the same key', () => {
    const input = [
      { type: 'a', val: 1 },
      { type: 'b', val: 2 },
      { type: 'a', val: 3 },
    ];
    const result = groupBy(input, (x) => x.type);
    expect(result).toHaveLength(2);
    const groupA = result.find((g) => g[0]?.type === 'a');
    const groupB = result.find((g) => g[0]?.type === 'b');
    expect(groupA).toEqual([
      { type: 'a', val: 1 },
      { type: 'a', val: 3 },
    ]);
    expect(groupB).toEqual([{ type: 'b', val: 2 }]);
  });

  it('puts every element in its own group when all keys are unique', () => {
    const result = groupBy([1, 2, 3], (x) => x);
    expect(result).toHaveLength(3);
  });
});

describe('randomFromList', () => {
  it('always returns an element from the input array', () => {
    const input = ['a', 'b', 'c', 'd'];
    for (let i = 0; i < 50; i++) {
      expect(input).toContain(randomFromList(input));
    }
  });

  it('returns the only element when the array has one item', () => {
    expect(randomFromList([42])).toBe(42);
  });
});
