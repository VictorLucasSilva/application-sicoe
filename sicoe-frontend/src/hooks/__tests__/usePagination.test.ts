import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePagination } from '../usePagination';

describe('usePagination', () => {
  it('should initialize with correct values', () => {
    const { result } = renderHook(() =>
      usePagination({ initialPage: 1, initialLimit: 10, totalItems: 100 })
    );

    expect(result.current.page).toBe(1);
    expect(result.current.limit).toBe(10);
    expect(result.current.totalPages).toBe(10);
  });

  it('should calculate correct total pages', () => {
    const { result } = renderHook(() =>
      usePagination({ initialPage: 1, initialLimit: 10, totalItems: 95 })
    );

    expect(result.current.totalPages).toBe(10);
  });

  it('should navigate to next page', () => {
    const { result } = renderHook(() =>
      usePagination({ initialPage: 1, initialLimit: 10, totalItems: 100 })
    );

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.page).toBe(2);
  });

  it('should navigate to previous page', () => {
    const { result } = renderHook(() =>
      usePagination({ initialPage: 3, initialLimit: 10, totalItems: 100 })
    );

    act(() => {
      result.current.prevPage();
    });

    expect(result.current.page).toBe(2);
  });

  it('should not go below page 1', () => {
    const { result } = renderHook(() =>
      usePagination({ initialPage: 1, initialLimit: 10, totalItems: 100 })
    );

    act(() => {
      result.current.prevPage();
    });

    expect(result.current.page).toBe(1);
  });

  it('should not go above total pages', () => {
    const { result } = renderHook(() =>
      usePagination({ initialPage: 10, initialLimit: 10, totalItems: 100 })
    );

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.page).toBe(10);
  });

  it('should go to specific page', () => {
    const { result } = renderHook(() =>
      usePagination({ initialPage: 1, initialLimit: 10, totalItems: 100 })
    );

    act(() => {
      result.current.goToPage(5);
    });

    expect(result.current.page).toBe(5);
  });

  it('should change limit and reset to page 1', () => {
    const { result } = renderHook(() =>
      usePagination({ initialPage: 5, initialLimit: 10, totalItems: 100 })
    );

    act(() => {
      result.current.changeLimit(20);
    });

    expect(result.current.limit).toBe(20);
    expect(result.current.page).toBe(1);
    expect(result.current.totalPages).toBe(5);
  });

  it('should generate correct page numbers for small total', () => {
    const { result } = renderHook(() =>
      usePagination({ initialPage: 1, initialLimit: 10, totalItems: 50 })
    );

    expect(result.current.pageNumbers).toEqual([1, 2, 3, 4, 5]);
  });

  it('should generate page numbers with ellipsis', () => {
    const { result } = renderHook(() =>
      usePagination({ initialPage: 5, initialLimit: 10, totalItems: 200 })
    );

    expect(result.current.pageNumbers).toContain('...');
    expect(result.current.pageNumbers).toContain(1);
    expect(result.current.pageNumbers).toContain(20);
  });

  it('should have correct navigation flags', () => {
    const { result } = renderHook(() =>
      usePagination({ initialPage: 1, initialLimit: 10, totalItems: 30 })
    );

    expect(result.current.canGoPrev).toBe(false);
    expect(result.current.canGoNext).toBe(true);

    act(() => {
      result.current.goToPage(3);
    });

    expect(result.current.canGoPrev).toBe(true);
    expect(result.current.canGoNext).toBe(false);
  });

  it('should reset to initial values', () => {
    const { result } = renderHook(() =>
      usePagination({ initialPage: 1, initialLimit: 10, totalItems: 100 })
    );

    act(() => {
      result.current.goToPage(5);
      result.current.changeLimit(20);
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.page).toBe(1);
    expect(result.current.limit).toBe(10);
  });
});
