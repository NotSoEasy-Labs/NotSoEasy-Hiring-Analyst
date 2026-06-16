import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();

    return NextResponse.json({
      success: true,
      message: "Mongo Connected",
    });
  } catch (error: any) {
    console.error(
      "MONGO ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ??
          "Mongo Connection Failed",
      },
      { status: 500 }
    );
  }
}