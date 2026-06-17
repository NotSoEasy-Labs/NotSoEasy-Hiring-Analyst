"use server";

import { connectDB } from "@/lib/mongodb";
import { Campaign } from "@/models/Campaign";

export async function renameCampaignAction(
  campaignId: string,
  title: string
) {
  try {
    await connectDB();

    await Campaign.findByIdAndUpdate(
      campaignId,
      {
        title: title.trim(),
      },
      {
        returnDocument: "after",
      }
    );

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: "Unable to rename campaign.",
    };
  }
}