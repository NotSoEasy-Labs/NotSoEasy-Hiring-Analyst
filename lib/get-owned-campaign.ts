import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import { Campaign } from "@/models/Campaign";

export async function getOwnedCampaign(
  campaignId: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  await connectDB();

  const campaign =
    await Campaign.findOne({
      _id: campaignId,
      ownerId: session.user.id,
    });

  if (!campaign) {
    throw new Error(
      "Campaign not found or access denied."
    );
  }

  return campaign;
}