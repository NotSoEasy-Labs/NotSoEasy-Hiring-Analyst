export interface UploadResult {
  storedFileName: string;
  path: string;
}

export interface StorageService {
  upload(
    buffer: Buffer,
    originalFileName: string,
    mimeType: string
  ): Promise<UploadResult>;

  delete(
    storedFileName: string
  ): Promise<void>;

  getDownloadPath(
    storedFileName: string
  ): string;
}