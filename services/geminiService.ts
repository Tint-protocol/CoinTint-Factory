import { GoogleGenAI, Type } from "@google/genai";
import { AIResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateTokenIdea = async (theme: string): Promise<AIResponse | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a creative cryptocurrency token concept based on the theme: "${theme}". 
      Return a detailed token name, symbol, a compelling description, a short marketing plan, 
      and suggested tokenomics (tax percentages).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            symbol: { type: Type.STRING },
            description: { type: Type.STRING },
            marketingPlan: { type: Type.STRING },
            tokenomics: {
              type: Type.OBJECT,
              properties: {
                tax: { type: Type.STRING },
                liquidity: { type: Type.STRING },
                marketing: { type: Type.STRING }
              },
              propertyOrdering: ["tax", "liquidity", "marketing"],
            }
          },
          required: ["name", "symbol", "description", "marketingPlan", "tokenomics"],
        }
      }
    });
    const text = response.text;
    return text ? JSON.parse(text.trim()) : null;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return null;
  }
};

export const generateTokenHype = async (name: string, symbol: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Write a high-energy, viral-ready cryptocurrency project description for a token called "${name}" (${symbol}). Focus on innovation, community, and future value. Keep it under 150 words.`,
    });
    return response.text || "";
  } catch (error) {
    console.error("Error generating hype:", error);
    return "";
  }
};

export const chatWithExpert = async (message: string, history: any[]) => {
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    history: history,
    config: {
      systemInstruction: "You are 'CoinTint AI', a world-class cryptocurrency launchpad expert. You help users design safe, viral tokens on the Ink Network.",
    }
  });
  const response = await chat.sendMessage({ message });
  return response.text;
};