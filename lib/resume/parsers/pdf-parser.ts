import { extractText } from "unpdf";

export async function parsePdf(
  buffer: Buffer
): Promise<string> {
  try {
    const uint8 = new Uint8Array(buffer);

    const result = await extractText(uint8);

    console.log("UNPDF RESULT:", result);

    return Array.isArray(result.text)
      ? result.text.join("\n").trim()
      : String(result.text ?? "").trim();
  } catch (error) {
    console.error("UNPDF ERROR:");
    console.error(error);

    if (error instanceof Error) {
      console.error(error.stack);
    }

    throw error;
  }
}