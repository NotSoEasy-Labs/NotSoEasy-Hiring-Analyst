"use server";

import fs from "fs/promises";
import path from "path";

import { auth } from "@/auth";

import { connectDB } from "@/lib/mongodb";
import { getOwnedCampaign } from "@/lib/get-owned-campaign";
import { parseResume } from "@/lib/resume/resume-parser";

import {
  Resume,
  ResumeStatus,
} from "@/models/Resume";

export async function parseResumeAction(
  resumeId: string
) {
  const startedAt = Date.now();

  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error(
        "Unauthorized"
      );
    }

    await connectDB();

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

    resume.status =
      ResumeStatus.PARSING;

    resume.parseError = null;

    await resume.save();

    const filePath =
      path.join(
        process.cwd(),
        "storage",
        "resumes",
        resume.storedFileName
      );

    const buffer =
      await fs.readFile(filePath);

    const parsed =
      await parseResume(
        buffer,
        resume.mimeType,
        resume.originalFileName
      );

    resume.rawText =
      parsed.rawText;

    resume.textLength =
      parsed.textLength;

    resume.wordCount =
      parsed.wordCount;

    resume.estimatedPages =
      parsed.estimatedPages;

    resume.isImageOnly =
      parsed.isImageOnly;

    resume.isLowQuality =
      parsed.isLowQuality;

    resume.parsedAt =
      new Date();

    resume.parserVersion =
      "1.0.0";

    resume.status =
      ResumeStatus.PARSED;

    await resume.save();

    console.log(
      `[Parser] ${resume._id} parsed in ${
        Date.now() -
        startedAt
      } ms`
    );

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    await connectDB();

    await Resume.findByIdAndUpdate(
      resumeId,
      {
        status:
          ResumeStatus.FAILED,

        parseError:
          error instanceof Error
            ? error.message
            : "Unknown parsing error.",
      }
    );

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unable to parse resume.",
    };
  }
}