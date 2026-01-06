
import { GoogleGenAI } from "@google/genai";
import { Transaction } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getFinancialAdvice = async (transactions: Transaction[]) => {
  try {
    const summary = transactions.slice(0, 10).map(t => `${t.type}: ${t.amount} AOA em ${t.category}`).join(', ');
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Com base nestas transações recentes de um jovem angolano: ${summary}. 
      Dê 3 dicas curtas e motivadoras (em português) de como ele pode economizar mais ou investir melhor visando independência financeira em 5-10 anos. 
      Foque na realidade de Angola (Kwanza, inflação, oportunidades locais). 
      Seja breve e use um tom de mentor amigável.`,
    });

    return response.text || "Continue focado em registrar seus gastos para que eu possa te dar conselhos melhores!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Mantenha a disciplina! Controlar seus gastos é o primeiro passo para a riqueza.";
  }
};
