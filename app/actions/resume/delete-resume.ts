"use server";

import { auth } from "@/auth";

import { connectDB } from "@/lib/mongodb";
import { Resume } from "@/models/Resume";

import { LocalStorageService } from "@/lib/storage/local-storage";
import { getOwnedCampaign } from "@/lib/get-owned-campaign";

const storage = new LocalStorageService();

export async function deleteResume(
  resumeId: string
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    await connectDB();

    const resume = await Resume.findById(
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

    await storage.delete(
      resume.storedFileName
    );

    await Resume.findByIdAndDelete(
      resumeId
    );

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
          : "Unable to delete resume.",
    };
  }
}