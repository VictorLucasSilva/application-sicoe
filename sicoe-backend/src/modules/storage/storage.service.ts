import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BlobServiceClient, ContainerClient, BlockBlobClient } from '@azure/storage-blob';

@Injectable()
export class StorageService {
  private blobServiceClient: BlobServiceClient;
  private containerClient: ContainerClient;
  private containerName: string;

  constructor(private configService: ConfigService) {
    const connectionString = this.configService.get<string>('AZURE_STORAGE_CONNECTION_STRING');
    this.containerName = this.configService.get<string>('AZURE_STORAGE_CONTAINER_NAME', 'sicoe-files');

    if (connectionString) {
      this.blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
      this.containerClient = this.blobServiceClient.getContainerClient(this.containerName);
    }
  }

  /**
   * Testa a conexão com o Azure Blob Storage
   */
  async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      if (!this.blobServiceClient) {
        return {
          success: false,
          message: 'Azure Storage connection string not configured',
        };
      }

      // Verifica se o container existe
      const exists = await this.containerClient.exists();

      if (!exists) {
        // Tenta criar o container se não existir
        await this.containerClient.create();
        return {
          success: true,
          message: `Container '${this.containerName}' created successfully`,
        };
      }

      return {
        success: true,
        message: `Connected to Azure Blob Storage. Container '${this.containerName}' exists`,
      };
    } catch (error) {
      return {
        success: false,
        message: `Azure Storage connection failed: ${error.message}`,
      };
    }
  }

  /**
   * Faz upload de um arquivo para o Azure Blob Storage
   */
  async uploadFile(
    fileName: string,
    fileBuffer: Buffer,
    contentType: string = 'application/octet-stream',
  ): Promise<string> {
    try {
      const blobClient: BlockBlobClient = this.containerClient.getBlockBlobClient(fileName);

      await blobClient.uploadData(fileBuffer, {
        blobHTTPHeaders: {
          blobContentType: contentType,
        },
      });

      return blobClient.url;
    } catch (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  /**
   * Faz download de um arquivo do Azure Blob Storage
   */
  async downloadFile(fileName: string): Promise<Buffer> {
    try {
      const blobClient: BlockBlobClient = this.containerClient.getBlockBlobClient(fileName);
      const downloadResponse = await blobClient.download();

      if (!downloadResponse.readableStreamBody) {
        throw new Error('No stream body in download response');
      }

      return await this.streamToBuffer(downloadResponse.readableStreamBody);
    } catch (error) {
      throw new Error(`Failed to download file: ${error.message}`);
    }
  }

  /**
   * Deleta um arquivo do Azure Blob Storage
   */
  async deleteFile(fileName: string): Promise<void> {
    try {
      const blobClient: BlockBlobClient = this.containerClient.getBlockBlobClient(fileName);
      await blobClient.delete();
    } catch (error) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }

  /**
   * Lista todos os arquivos no container
   */
  async listFiles(): Promise<string[]> {
    try {
      const files: string[] = [];

      for await (const blob of this.containerClient.listBlobsFlat()) {
        files.push(blob.name);
      }

      return files;
    } catch (error) {
      throw new Error(`Failed to list files: ${error.message}`);
    }
  }

  /**
   * Converte stream para buffer
   */
  private async streamToBuffer(readableStream: NodeJS.ReadableStream): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      readableStream.on('data', (data) => {
        chunks.push(data instanceof Buffer ? data : Buffer.from(data));
      });
      readableStream.on('end', () => {
        resolve(Buffer.concat(chunks));
      });
      readableStream.on('error', reject);
    });
  }
}
