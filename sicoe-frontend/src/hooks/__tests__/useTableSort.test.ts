import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTableSort } from '../useTableSort';

describe('useTableSort', () => {
  const mockData = [
    { id: 3, name: 'Charlie', age: 25 },
    { id: 1, name: 'Alice', age: 30 },
    { id: 2, name: 'Bob', age: 20 },
  ];

  it('should return unsorted data initially', () => {
    const { result } = renderHook(() => useTableSort(mockData));
    expect(result.current.sortedData).toEqual(mockData);
  });

  it('should sort data in ascending order', () => {
    const { result } = renderHook(() => useTableSort(mockData));

    act(() => {
      result.current.requestSort('name');
    });

    expect(result.current.sortedData[0].name).toBe('Alice');
    expect(result.current.sortedData[1].name).toBe('Bob');
    expect(result.current.sortedData[2].name).toBe('Charlie');
  });

  it('should sort data in descending order', () => {
    const { result } = renderHook(() => useTableSort(mockData));

    act(() => {
      result.current.requestSort('name');
    });

    act(() => {
      result.current.requestSort('name');
    });

    expect(result.current.sortedData[0].name).toBe('Charlie');
    expect(result.current.sortedData[1].name).toBe('Bob');
    expect(result.current.sortedData[2].name).toBe('Alice');
  });

  it('should reset sorting when clicking third time', () => {
    const { result } = renderHook(() => useTableSort(mockData));

    act(() => {
      result.current.requestSort('age');
    });
    expect(result.current.getSortDirection('age')).toBe('asc');

    act(() => {
      result.current.requestSort('age');
    });
    expect(result.current.getSortDirection('age')).toBe('desc');

    act(() => {
      result.current.requestSort('age');
    });
    expect(result.current.getSortDirection('age')).toBeNull();
  });

  it('should handle nested properties', () => {
    const nestedData = [
      { id: 1, user: { name: 'Charlie' } },
      { id: 2, user: { name: 'Alice' } },
      { id: 3, user: { name: 'Bob' } },
    ];

    const { result } = renderHook(() => useTableSort(nestedData));

    act(() => {
      result.current.requestSort('user.name');
    });

    expect(result.current.sortedData[0].user.name).toBe('Alice');
  });

  it('should get correct sort direction', () => {
    const { result } = renderHook(() => useTableSort(mockData));

    expect(result.current.getSortDirection('name')).toBeNull();

    act(() => {
      result.current.requestSort('name');
    });

    expect(result.current.getSortDirection('name')).toBe('asc');

    act(() => {
      result.current.requestSort('name');
    });

    expect(result.current.getSortDirection('name')).toBe('desc');
  });
});
