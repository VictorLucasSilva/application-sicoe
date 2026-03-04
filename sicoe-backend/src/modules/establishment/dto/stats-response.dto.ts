export class RegionStatsDto {
  regionId: number;
  regionName: string;
  count: number;
}

export class DocumentStatusDto {
  regular: number;
  invalid: number;
  vencido: number;
  aVencer: number;
  emAnalise: number;
}

export class StatsResponseDto {
  total: number;
  byRegion: RegionStatsDto[];
  documentStatus: DocumentStatusDto;
}
