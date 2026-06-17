import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

import {
  StorageService,
  UploadResult,
} from "./storage";

const STORAGE_DIR = path.join(
  process.cwd(),
  "storage",
  "resumes"
);

export class LocalStorageService
  implements StorageService
{
  async upload(
    buffer: Buffer,
    originalFileName: string,
    mimeType: string
  ): Promise<UploadResult> {
    await fs.mkdir(STORAGE_DIR, {
      recursive: true,
    });

    const extension =
      path.extname(
        originalFileName
      );

    const storedFileName =
      `${crypto.randomUUID()}${extension}`;

    const filePath = path.join(
      STORAGE_DIR,
      storedFileName
    );

    await fs.writeFile(
      filePath,
      buffer
    );

    return {
      storedFileName,
      path: filePath,
    };
  }

  async delete(
    storedFileName: string
  ): Promise<void> {
    const filePath = path.join(
      STORAGE_DIR,
      storedFileName
    );

    try {
      await fs.unlink(filePath);
    } catch {
      // Ignore if already deleted.
    }
  }

  getDownloadPath(
    storedFileName: string
  ): string {
    return path.join(
      STORAGE_DIR,
      storedFileName
    );
  }
}