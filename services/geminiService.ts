import { GoogleGenAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

// Inicializamos el cliente fuera para evitar errores de scope
const genAI = API_KEY ? new GoogleGenAI(API_KEY) : null;

export const createChatSession = (articleTitle: string, term: string) => {
  if (!genAI) return null;

  const model = genAI.getGenerativeModel({ 
    model: 'gemini-1.5-flash',
    systemInstruction: `Eres un guía experto. El usuario lee "${articleTitle}" y pregunta por "${term}".`,
  });

  return model.startChat({
    history: [],
  });
};

export const sendChatMessage = async (chat: any, message: string): Promise<string> => {
  try {
    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text() || "Sin respuesta.";
  } catch (error) {
    console.error(error);
    throw new Error("Error de IA");
  }
};
