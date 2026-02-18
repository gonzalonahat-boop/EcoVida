
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
          { text: "Analyze this object. Tell me exactly what material it is and if it's recyclable. Return as JSON with keys: material, isRecyclable (boolean), instructions (short), and pointsReward (integer)." }
        ]
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            material: { type: Type.STRING },
            isRecyclable: { type: Type.BOOLEAN },
            instructions: { type: Type.STRING },
            pointsReward: { type: Type.INTEGER }
          },
          required: ['material', 'isRecyclable', 'instructions', 'pointsReward']
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Analysis failed:", error);
    return null;
  }
};

export const getEcoTips = async (topic: string) => {
    const ai = getAI();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Give me 3 short, actionable eco-tips for: ${topic}. Format as a simple list.`,
        });
        return response.text;
    } catch (e) {
        return "Always remember to reduce, reuse, and recycle!";
    }
}
