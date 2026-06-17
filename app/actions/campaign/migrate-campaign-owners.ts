"use server";

import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import { Campaign } from "@/models/Campaign";

export async function migrateCampaignOwnersAction() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    await connectDB();

    const result = await Campaign.updateMany(
      {
        ownerId: null,
      },
      {
        $set: {
          ownerId: session.user.id,
        },
      }
    );

    return {
      success: true,
      modified: result.modifiedCount,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: "Migration failed.",
    };
  }
}