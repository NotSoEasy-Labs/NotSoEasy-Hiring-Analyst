import {
  NextRequest,
  NextResponse,
} from "next/server";

import { connectDB } from "@/lib/mongodb";
import { Campaign } from "@/models/Campaign";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: NextRequest,
  { params }: Params
) {
  try {
    await connectDB();

    const { id } =
      await params;

    const campaign =
      await Campaign.findById(id);

    if (!campaign) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Campaign not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      campaign,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to fetch campaign.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: Params
) {
  try {
    await connectDB();

    const { id } =
      await params;

    const body =
      await request.json();

    const campaign =
      await Campaign.findByIdAndUpdate(
        id,
        body,
        {
          new: true,
        }
      );

    if (!campaign) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Campaign not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      campaign,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to update campaign.",
      },
      { status: 500 }
    );
  }
}