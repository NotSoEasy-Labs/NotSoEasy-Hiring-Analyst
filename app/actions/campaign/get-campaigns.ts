"use server";

import { connectDB } from "@/lib/mongodb";
import { Campaign } from "@/models/Campaign";

export async function getCampaignsAction() {
  try {
    await connectDB();

const campaigns = await Campaign.find()
  .sort({ updatedAt: -1 })
  .lean();

    return {
      success: true,
      campaigns,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      campaigns: [],
      error: "Unable to load campaigns.",
    };
  }
}