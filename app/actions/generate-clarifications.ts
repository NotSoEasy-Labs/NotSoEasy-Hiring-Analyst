"use server";

import { generateClarifications } from "@/lib/clarification-generator";

export async function generateClarificationsAction(
  framework: string
) {
  try {
    const questions =
      await generateClarifications(
        framework
      );

    return {
      success: true,
      questions,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      questions: [],
    };
  }
}