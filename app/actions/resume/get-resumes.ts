"use server";

import { auth } from "@/auth";

import { connectDB } from "@/lib/mongodb";

import { Resume } from "@/models/Resume";

import { getOwnedCampaign } from "@/lib/get-owned-campaign";

export async function getResumes(
  campaignId: string
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    await getOwnedCampaign(
      campaignId
    );

    await connectDB();

    const resumes =
      await Resume.find({
        campaignId,
      })
        .sort({
          createdAt: -1,
        })
        .lean();

    return {
      success: true,
      resumes: JSON.parse(
        JSON.stringify(resumes)
      ),
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      resumes: [],
      error:
        error instanceof Error
          ? error.message
          : "Unable to load resumes.",
    };
  }
}