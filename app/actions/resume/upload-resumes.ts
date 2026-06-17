"use server";

import { auth } from "@/auth";

import { Resume, ResumeStatus } from "@/models/Resume";

import { connectDB } from "@/lib/mongodb";
import { LocalStorageService } from "@/lib/storage/local-storage";
import { validateResumeFile } from "@/lib/resume/validate-upload";
import { sha256 } from "@/lib/resume/hash";
import { getOwnedCampaign } from "@/lib/get-owned-campaign";
type UploadResumeResult =
  | {
      success: true;
      resumes: any[];
    }
  | {
      success: false;
      error: string;
    };
const storage = new LocalStorageService();

export async function uploadResumes(
  formData: FormData
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const campaignId =
      formData.get("campaignId") as string;

    if (!campaignId) {
      throw new Error(
        "Campaign ID is required."
      );
    }

    await getOwnedCampaign(
      campaignId
    );

    await connectDB();

    const files = formData.getAll(
      "resumes"
    ) as File[];

    if (!files.length) {
      throw new Error(
        "Please upload at least one resume."
      );
    }

    const uploadedResumes = [];

    for (const file of files) {
      validateResumeFile(file);

      const bytes =
        await file.arrayBuffer();

      const buffer =
        Buffer.from(bytes);

      const hash =
        sha256(buffer);

      const duplicate =
        await Resume.findOne({
          campaignId,
          sha256: hash,
        });

      if (duplicate) {
        continue;
      }

      const result =
        await storage.upload(
          buffer,
          file.name,
          file.type
        );

      const resume =
        await Resume.create({
          campaignId,

          uploadedBy:
            session.user.id,

          originalFileName:
            file.name,

          storedFileName:
            result.storedFileName,

          mimeType:
            file.type,

          fileSize:
            file.size,

          status:
            ResumeStatus.UPLOADED,

          sha256: hash,
        });

      uploadedResumes.push(
        resume
      );
    }

    return {
      success: true,
      resumes:
        uploadedResumes,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unable to upload resumes.",
    };
  }
}