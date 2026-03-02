/**
 * Hook customizado para ordenação de tabelas
 * Permite ordenação crescente e decrescente por múltiplas colunas simultaneamente
 *
 * Uso:
 * - Clique simples: Define ordenação única na coluna
 * - Ctrl/Cmd + Clique: Adiciona ordenação múltipla
 * - Ciclo: null → asc → desc → null
 */

import { useState, useMemo } from 'react';

export type SortDirection = 'asc' | 'desc' | null;

export interface SortConfig {
  key: string;
  direction: SortDirection;
}

export function useTableSort<T>(data: T[], initialSort?: SortConfig[]) {
  const [sortConfigs, setSortConfigs] = useState<SortConfig[]>(initialSort || []);

  const sortedData = useMemo(() => {
    if (sortConfigs.length === 0) {
      return data;
    }

    const sorted = [...data].sort((a, b) => {
      // Aplica ordenações em ordem de prioridade
      for (const config of sortConfigs) {
        if (!config.direction) continue;

        const aValue = getNestedValue(a, config.key);
        const bValue = getNestedValue(b, config.key);

        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        if (aValue < bValue) {
          return config.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return config.direction === 'asc' ? 1 : -1;
        }
        // Se forem iguais, continua para próxima ordenação
      }
      return 0;
    });

    return sorted;
  }, [data, sortConfigs]);

  const requestSort = (key: string) => {
    setSortConfigs((prevConfigs) => {
      // Encontra se já existe ordenação para esta coluna
      const existingIndex = prevConfigs.findIndex((config) => config.key === key);
      const existingConfig = existingIndex >= 0 ? prevConfigs[existingIndex] : null;

      // Determina próxima direção
      let nextDirection: SortDirection = 'asc';
      if (existingConfig) {
        if (existingConfig.direction === 'asc') {
          nextDirection = 'desc';
        } else if (existingConfig.direction === 'desc') {
          nextDirection = null;
        }
      }

      // Multi-sort automático: adiciona/atualiza/remove da lista
      if (nextDirection === null) {
        // Remove esta ordenação
        return prevConfigs.filter((config) => config.key !== key);
      }

      if (existingIndex >= 0) {
        // Atualiza direção existente
        const newConfigs = [...prevConfigs];
        newConfigs[existingIndex] = { key, direction: nextDirection };
        return newConfigs;
      }

      // Adiciona nova ordenação
      return [...prevConfigs, { key, direction: nextDirection }];
    });
  };

  const getSortDirection = (key: string): SortDirection => {
    const config = sortConfigs.find((c) => c.key === key);
    return config?.direction || null;
  };

  const getSortIndex = (key: string): number => {
    const index = sortConfigs.findIndex((c) => c.key === key);
    return index >= 0 ? index + 1 : 0; // Retorna 1-based index ou 0 se não ordenado
  };

  const clearSort = () => {
    setSortConfigs([]);
  };

  return {
    sortedData,
    requestSort,
    getSortDirection,
    getSortIndex,
    sortConfigs,
    clearSort,
  };
}

// Helper para acessar valores aninhados (ex: "user.name")
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}
