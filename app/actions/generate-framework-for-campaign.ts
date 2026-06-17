"use server";

import { Campaign } from "@/models/Campaign";
import { connectDB } from "@/lib/mongodb";

import { generateFramework } from "@/lib/framework-generator";
import { HiringFramework } from "@/types/framework";
import { getOwnedCampaign } from "@/lib/get-owned-campaign";

type Response =
  | {
      success: true;
      framework: HiringFramework;
    }
  | {
      success: false;
      error: string;
    };

export async function generateFrameworkForCampaignAction(
  campaignId: string
): Promise<Response> {
  try {

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

if (campaign.framework) {
  console.log(
    "✅ Returning framework from Mongo"
  );

  return {
    success: true,
    framework: campaign.framework,
  };
}

console.log(
  "🤖 Generating framework with Gemini..."
);


    const framework =
      await generateFramework(
        campaign.jobDescription,
        campaign.recruiterNotes
      );

    campaign.framework = framework;

    campaign.status =
      "FRAMEWORK_GENERATED";

    await campaign.save();

    return {
      success: true,
      framework,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error:
        "Unable to generate framework.",
    };
  }
}