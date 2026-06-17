"use server";

import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import { Campaign } from "@/models/Campaign";

export async function renameCampaignAction(
  campaignId: string,
  title: string
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    await connectDB();

    const campaign =
      await Campaign.findOneAndUpdate(
        {
          _id: campaignId,
          ownerId: session.user.id,
        },
        {
          title: title.trim(),
        },
        {
          returnDocument: "after",
        }
      );

    if (!campaign) {
      return {
        success: false,
        error:
          "Campaign not found or access denied.",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error:
        "Unable to rename campaign.",
    };
  }
}