"use server";

import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import { Campaign } from "@/models/Campaign";

export async function getCampaignsAction() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        campaigns: [],
        error: "Unauthorized",
      };
    }

    await connectDB();

    const campaigns =
      await Campaign.find({
        ownerId: session.user.id,
      })
        .sort({
          updatedAt: -1,
        })
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