import { renderHook } from '@testing-library/react';
import useShortener from './useShortener';
import { describe, expect, test } from 'vitest';
import { act } from 'react-dom/test-utils';

describe('Test useShortener', () => {
  test('Should generate 10000 unique IDs without a conflict', () => {
    const amount = 10000;
    const { result } = renderHook(() => useShortener());
    const uidSet = new Set<string>();
    act(() => {
      for (let i = 0; i < amount; i++) {
        result.current.generateUniqueId();
        uidSet.add(result.current.generateUniqueId());
      }
    });

    expect(uidSet.size).toBe(amount);
  });
});
