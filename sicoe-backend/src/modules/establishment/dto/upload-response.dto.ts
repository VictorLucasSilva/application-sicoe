export class UploadResponseDto {
  id: number;
  nmFile: string;
  dsFilePath: string;
  dtValidity: Date;
  tsAttached: Date;
  document: {
    id: number;
    nmDocument: string;
  };
}
