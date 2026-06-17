import fs from "fs/promises";

import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import { LocalStorageService } from "@/lib/storage/local-storage";
import { Resume } from "@/models/Resume";
import { getOwnedCampaign } from "@/lib/get-owned-campaign";

const storage = new LocalStorageService();

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: Request,
  { params }: Props
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse(
        "Unauthorized",
        {
          status: 401,
        }
      );
    }

    await connectDB();

    const { id } = await params;

    const resume =
      await Resume.findById(id);

    if (!resume) {
      return new NextResponse(
        "Resume not found.",
        {
          status: 404,
        }
      );
    }

    await getOwnedCampaign(
      resume.campaignId.toString()
    );

    const filePath =
      storage.getDownloadPath(
        resume.storedFileName
      );

    const file =
      await fs.readFile(filePath);

    return new NextResponse(file, {
      headers: {
        "Content-Type":
          resume.mimeType,

        "Content-Disposition":
          `attachment; filename="${resume.originalFileName}"`,

        "Cache-Control":
          "private, no-store",
      },
    });
  } catch (error) {
    console.error(error);

    return new NextResponse(
      "Unable to download resume.",
      {
        status: 500,
      }
    );
  }
}