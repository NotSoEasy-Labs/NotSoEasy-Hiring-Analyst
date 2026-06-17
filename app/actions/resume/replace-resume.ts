"use server";

import { auth } from "@/auth";

import { connectDB } from "@/lib/mongodb";
import { Resume } from "@/models/Resume";
import { LocalStorageService } from "@/lib/storage/local-storage";
import { getOwnedCampaign } from "@/lib/get-owned-campaign";
import { uploadResumeFile } from "@/lib/resume/upload-file";

const storage = new LocalStorageService();

export async function replaceResume(
  formData: FormData
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error(
        "Unauthorized"
      );
    }

    await connectDB();

    const resumeId =
      formData.get(
        "resumeId"
      ) as string;

    const file = formData.get(
      "resume"
    ) as File;

    if (!resumeId || !file) {
      throw new Error(
        "Invalid request."
      );
    }

    const resume =
      await Resume.findById(
        resumeId
      );

    if (!resume) {
      throw new Error(
        "Resume not found."
      );
    }

    await getOwnedCampaign(
      resume.campaignId.toString()
    );

    const uploaded =
      await uploadResumeFile(file);

    await storage.delete(
      resume.storedFileName
    );

    resume.originalFileName =
      uploaded.originalFileName;

    resume.storedFileName =
      uploaded.storedFileName;

    resume.mimeType =
      uploaded.mimeType;

    resume.fileSize =
      uploaded.fileSize;

    resume.sha256 =
      uploaded.sha256;

    resume.status =
      "UPLOADED";

    await resume.save();

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unable to replace resume.",
    };
  }
}