"use server";

import { auth } from "@/auth";

import { connectDB } from "@/lib/mongodb";
import { getOwnedCampaign } from "@/lib/get-owned-campaign";

import {
  Resume,
  ResumeStatus,
} from "@/models/Resume";

import { parseResumeAction } from "./parse-resume";

export async function parseAllResumesAction(
  campaignId: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  await connectDB();

  await getOwnedCampaign(campaignId);

  const resumes = await Resume.find({
    campaignId,
    status: ResumeStatus.UPLOADED,
  }).select("_id originalFileName");

  let parsed = 0;
  let failed = 0;

  const errors: {
    resumeId: string;
    fileName: string;
    reason: string;
  }[] = [];

  for (const resume of resumes) {
    const result = await parseResumeAction(
      resume._id.toString()
    );

    if (result.success) {
      parsed++;
    } else {
      failed++;

      errors.push({
        resumeId: resume._id.toString(),
        fileName: resume.originalFileName,
        reason: result.error ?? "Unknown error",
      });
    }
  }

  return {
    success: true,
    total: resumes.length,
    parsed,
    failed,
    errors,
  };
}