"use server";

import { connectDB } from "@/lib/mongodb";
import { getOwnedCampaign } from "@/lib/get-owned-campaign";
import { generateClarifications } from "@/lib/clarification-generator";

import { ClarificationQuestion } from "@/types/clarification";

type Response =
  | {
      success: true;
      questions: ClarificationQuestion[];
    }
  | {
      success: false;
      error: string;
    };

export async function generateClarificationsForCampaignAction(
  campaignId: string
): Promise<Response> {
  try {
    await connectDB();

    const campaign =
      await getOwnedCampaign(campaignId);

    if (!campaign) {
      return {
        success: false,
        error: "Campaign not found.",
      };
    }

    // Always regenerate after structured-output migration.
    // Old Mongo documents don't contain the new schema.
    const questions =
      await generateClarifications(
        JSON.stringify(campaign.framework)
      );

    campaign.clarificationQuestions =
      questions;

    campaign.status =
      "CLARIFICATION_PENDING";

    await campaign.save();

    return {
      success: true,
      questions,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error:
        "Unable to generate clarification questions.",
    };
  }
}