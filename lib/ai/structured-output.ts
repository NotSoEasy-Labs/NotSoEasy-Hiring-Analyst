import { gemini } from "../gemini";

interface StructuredOutputOptions<T> {
  prompt: string;
  schema: object;
  model?: string;
}

export async function generateStructuredOutput<T>({
  prompt,
  schema,
  model = "gemini-2.5-flash",
}: StructuredOutputOptions<T>): Promise<T> {
  const response = await gemini.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  const text =
    response.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

  if (!text.trim()) {
    throw new Error("Gemini returned an empty response.");
  }

  try {
    return JSON.parse(text) as T;
  } catch (err) {
    console.error("Invalid JSON returned by Gemini:");
    console.error(text);
    throw err;
  }
}