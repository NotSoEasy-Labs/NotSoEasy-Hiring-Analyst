"use server";

import { connectDB } from "@/lib/mongodb";
import { Campaign } from "@/models/Campaign";

export async function deleteCampaignAction(
  campaignId: string
) {
  try {
    await connectDB();

    await Campaign.findByIdAndDelete(
      campaignId
    );

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error:
        "Unable to delete campaign.",
    };
  }
}