/**
 * Hook customizado para gerenciar paginação
 * Otimizado com useMemo para evitar recálculos desnecessários
 */

import { useState, useMemo, useCallback } from 'react';

export interface PaginationConfig {
  initialPage?: number;
  initialLimit?: number;
  totalItems: number;
}

export function usePagination({ initialPage = 1, initialLimit = 10, totalItems }: PaginationConfig) {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  // Memoize total pages calculation
  const totalPages = useMemo(() => Math.ceil(totalItems / limit), [totalItems, limit]);

  // Memoize page numbers array
  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (page > 3) {
        pages.push('...');
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (page < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  }, [page, totalPages]);

  // Use useCallback to prevent unnecessary re-renders
  const goToPage = useCallback((newPage: number) => {
    setPage(Math.max(1, Math.min(newPage, totalPages)));
  }, [totalPages]);

  const nextPage = useCallback(() => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const changeLimit = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Reset to first page when changing limit
  }, []);

  const reset = useCallback(() => {
    setPage(initialPage);
    setLimit(initialLimit);
  }, [initialPage, initialLimit]);

  return {
    page,
    limit,
    totalPages,
    pageNumbers,
    goToPage,
    nextPage,
    prevPage,
    changeLimit,
    reset,
    canGoNext: page < totalPages,
    canGoPrev: page > 1,
  };
}
