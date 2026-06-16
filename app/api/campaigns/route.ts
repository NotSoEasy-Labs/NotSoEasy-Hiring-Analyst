import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { Campaign } from "@/models/Campaign";

export async function POST(
  request: NextRequest
) {
  try {
    await connectDB();

    const body =
      await request.json();

    const campaign =
      await Campaign.create({
        title: body.title,
        jobDescription:
          body.jobDescription,
        recruiterNotes:
          body.recruiterNotes,
        status: "DRAFT",
      });

    return NextResponse.json(
      {
        success: true,
        campaign,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to create campaign.",
      },
      { status: 500 }
    );
  }
}