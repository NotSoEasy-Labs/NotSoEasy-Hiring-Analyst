import { GoogleGenAI } from "@google/genai";

console.log(
  "GEMINI KEY FOUND:",
  !!process.env.GEMINI_API_KEY
);

console.log(
  "KEY PREFIX:",
  process.env.GEMINI_API_KEY?.slice(0, 6)
);

export const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});