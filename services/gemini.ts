
import { GoogleGenAI, Type } from "@google/genai";

// Initializing with direct reference to process.env.API_KEY as per coding guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getHealthAdvice = async (userStats: any, question: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User Stats: ${JSON.stringify(userStats)}. User Question: ${question}`,
      config: {
        systemInstruction: "You are Vitali, a world-class health analyst. Provide concise, realistic, and actionable health advice based on the user's data. Do not use emojis. Use professional, encouraging tone.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble analyzing your data right now. Please try again later.";
  }
};

export const generateMealPlan = async (preferences: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 3 healthy meal ideas for someone who likes: ${preferences.join(", ")}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              calories: { type: Type.NUMBER },
              protein: { type: Type.NUMBER },
              description: { type: Type.STRING },
            },
            required: ["name", "calories", "protein", "description"]
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Meal Plan Error:", error);
    return [];
  }
};
