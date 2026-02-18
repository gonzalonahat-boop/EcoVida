
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeWasteImage = async (base64Image: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { data: base64Image.split(',')[1], mimeType: 'image/jpeg' } },
          { text: "Identify the main object in this photo for recycling purposes. Be extremely specific about the primary material (Plastic, Glass, Metal, Paper, or Organic). Determine if it is recyclable in standard urban systems. Provide 2 very short, clear steps for proper disposal. Assign a difficulty-based reward from 5 to 50 points. Return strictly JSON." }
        ]
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            material: { type: Type.STRING },
            isRecyclable: { type: Type.BOOLEAN },
            instructions: { type: Type.STRING, description: "Max 100 characters instructions" },
            pointsReward: { type: Type.INTEGER }
          },
          required: ['material', 'isRecyclable', 'instructions', 'pointsReward']
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Vision analysis error:", error);
    return {
      material: "Unknown Object",
      isRecyclable: false,
      instructions: "We couldn't identify the item. Please try again with better lighting.",
      pointsReward: 0
    };
  }
};
