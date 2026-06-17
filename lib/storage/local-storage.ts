import {
  StorageService,
  UploadResult,
} from "./storage";

export class LocalStorageService
  implements StorageService
{
  async upload(
    buffer: Buffer,
    originalFileName: string,
    mimeType: string
  ): Promise<UploadResult> {
    // Real implementation comes in the next step
    // This satisfies the interface for now.

    return {
      storedFileName: "",
      path: "",
    };
  }

  async delete(
    storedFileName: string
  ): Promise<void> {
    // Real implementation comes later.
    return;
  }

  getDownloadPath(
    storedFileName: string
  ): string {
    return `/uploads/${storedFileName}`;
  }
}