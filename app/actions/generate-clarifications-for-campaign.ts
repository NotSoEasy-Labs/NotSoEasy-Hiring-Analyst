"use server";

import { connectDB } from "@/lib/mongodb";
import { Campaign } from "@/models/Campaign";

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
      await Campaign.findById(campaignId);

    console.log(
      "Loading campaign:",
      campaignId
    );

    if (!campaign) {
      return {
        success: false,
        error:
          "Campaign not found.",
      };
    }

    if (
      campaign.clarificationQuestions &&
      campaign.clarificationQuestions
        .length > 0
    ) {
      console.log(
        "✅ Returning clarification questions from Mongo"
      );

      return {
        success: true,
        questions:
          campaign.clarificationQuestions,
      };
    }

    console.log(
      "🤖 Generating clarification questions..."
    );

    const questions =
      await generateClarifications(
        JSON.stringify(
          campaign.framework
        )
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