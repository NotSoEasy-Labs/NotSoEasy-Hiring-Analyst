import { LocalStorageService } from "@/lib/storage/local-storage";
import { sha256 } from "@/lib/resume/hash";
import { validateResumeFile } from "@/lib/resume/validate-upload";

const storage = new LocalStorageService();

export async function uploadResumeFile(
  file: File
) {
  validateResumeFile(file);

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const hash = sha256(buffer);

  const storageResult =
    await storage.upload(
      buffer,
      file.name,
      file.type
    );

  return {
    originalFileName: file.name,
    mimeType: file.type,
    fileSize: file.size,
    sha256: hash,
    storedFileName:
      storageResult.storedFileName,
  };
}