"use server";

import { HiringFramework } from "@/types/framework";
import { refineFramework } from "@/lib/framework-refiner";

type RefineFrameworkResponse =
  | {
      success: true;
      framework: HiringFramework;
    }
  | {
      success: false;
      error: string;
    };

export async function refineFrameworkAction(
  framework: HiringFramework,
  answers: Record<string, string>
): Promise<RefineFrameworkResponse> {
  try {
    const refinedFramework =
      await refineFramework(
        framework,
        answers
      );

    return {
      success: true,
      framework: refinedFramework,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error:
        "Unable to refine framework.",
    };
  }
}