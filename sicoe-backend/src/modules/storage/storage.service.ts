import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BlobServiceClient, ContainerClient, BlockBlobClient } from '@azure/storage-blob';

@Injectable()
export class StorageService {
  private blobServiceClient: BlobServiceClient;
  private mediaContainer: string;
  private genericContainer: string;

  constructor(private configService: ConfigService) {
    const connectionString = this.configService.get<string>('AZURE_STORAGE_CONNECTION_STRING');
    this.mediaContainer = this.configService.get<string>('AZURE_STORAGE_MEDIA_CONTAINER', 'media');
    this.genericContainer = this.configService.get<string>('AZURE_STORAGE_GENERIC_CONTAINER', 'storage');

    if (connectionString) {
      this.blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    }
  }

  private getContainerClient(containerName?: string): ContainerClient {
    const container = containerName || this.mediaContainer;
    return this.blobServiceClient.getContainerClient(container);
  }

  async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      if (!this.blobServiceClient) {
        return {
          success: false,
          message: 'Azure Storage connection string not configured',
        };
      }

      const mediaContainerClient = this.getContainerClient(this.mediaContainer);
      const genericContainerClient = this.getContainerClient(this.genericContainer);

      const mediaExists = await mediaContainerClient.exists();
      const genericExists = await genericContainerClient.exists();

      const messages: string[] = [];

      if (!mediaExists) {
        await mediaContainerClient.create();
        messages.push(`Container 'media' (PDFs) created`);
      } else {
        messages.push(`Container 'media' (PDFs) exists`);
      }

      if (!genericExists) {
        await genericContainerClient.create();
        messages.push(`Container 'storage' (generic) created`);
      } else {
        messages.push(`Container 'storage' (generic) exists`);
      }

      return {
        success: true,
        message: `Connected to Azure Blob Storage. ${messages.join(', ')}`,
      };
    } catch (error) {
      return {
        success: false,
        message: `Azure Storage connection failed: ${error.message}`,
      };
    }
  }

  async uploadFile(
    fileName: string,
    fileBuffer: Buffer,
    contentType: string = 'application/octet-stream',
    containerName?: string,
  ): Promise<string> {
    try {
      const containerClient = this.getContainerClient(containerName);
      const blobClient: BlockBlobClient = containerClient.getBlockBlobClient(fileName);

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

  async downloadFile(fileName: string, containerName?: string): Promise<Buffer> {
    try {
      const containerClient = this.getContainerClient(containerName);
      const blobClient: BlockBlobClient = containerClient.getBlockBlobClient(fileName);
      const downloadResponse = await blobClient.download();

      if (!downloadResponse.readableStreamBody) {
        throw new Error('No stream body in download response');
      }

      return await this.streamToBuffer(downloadResponse.readableStreamBody);
    } catch (error) {
      throw new Error(`Failed to download file: ${error.message}`);
    }
  }

  async deleteFile(fileName: string, containerName?: string): Promise<void> {
    try {
      const containerClient = this.getContainerClient(containerName);
      const blobClient: BlockBlobClient = containerClient.getBlockBlobClient(fileName);
      await blobClient.delete();
    } catch (error) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }

  async listFiles(containerName?: string): Promise<string[]> {
    try {
      const containerClient = this.getContainerClient(containerName);
      const files: string[] = [];

      for await (const blob of containerClient.listBlobsFlat()) {
        files.push(blob.name);
      }

      return files;
    } catch (error) {
      throw new Error(`Failed to list files: ${error.message}`);
    }
  }


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
