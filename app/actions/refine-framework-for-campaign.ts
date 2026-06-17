"use server";

import { connectDB } from "@/lib/mongodb";
import { Campaign } from "@/models/Campaign";

import { refineFramework } from "@/lib/framework-refiner";
import { getOwnedCampaign } from "@/lib/get-owned-campaign";

import { HiringFramework } from "@/types/framework";

type Response =
  | {
      success: true;
      framework: HiringFramework;
    }
  | {
      success: false;
      error: string;
    };

export async function refineFrameworkForCampaignAction(
  campaignId: string,
  answers: Record<string, string>
): Promise<Response> {
  try {
    await connectDB();

const campaign =
  await getOwnedCampaign(campaignId);
    console.log(
      "Loading campaign:",
      campaignId
    );

    if (!campaign) {
      return {
        success: false,
        error: "Campaign not found.",
      };
    }

    campaign.clarificationAnswers =
      answers;

    if (campaign.refinedFramework) {
      console.log(
        "✅ Returning refined framework from Mongo"
      );

      return {
        success: true,
        framework:
          campaign.refinedFramework,
      };
    }

    console.log(
      "🤖 Generating refined framework..."
    );

    const refinedFramework =
      await refineFramework(
        campaign.framework,
        answers
      );

    campaign.refinedFramework =
      refinedFramework;

    campaign.status =
      "READY_FOR_EVALUATION";

    await campaign.save();

    return {
      success: true,
      framework:
        refinedFramework,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error:
        "Unable to refine framework.",
    };
  }
}