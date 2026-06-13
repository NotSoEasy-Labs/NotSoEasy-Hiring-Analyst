"use server";

import { HiringFramework } from "@/types/framework";
import { generateFramework } from "@/lib/framework-generator";

type GenerateFrameworkResponse =
  | {
      success: true;
      framework: HiringFramework;
    }
  | {
      success: false;
      error: string;
    };

export async function generateFrameworkAction(
  jobDescription: string,
  recruiterNotes: string
): Promise<GenerateFrameworkResponse> {
  try {
    console.log("JD:", jobDescription);
    console.log("NOTES:", recruiterNotes);

    const framework =
      await generateFramework(
        jobDescription,
        recruiterNotes
      );

    return {
      success: true,
      framework,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error:
        "Unable to generate framework. Please try again.",
    };
  }
}