import * as GoogleGenerativeAI from '@google/generative-ai';

// Usamos la variable de entorno configurada en Vercel
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

let aiClient: any = null;

try {
  if (API_KEY) {
    // Nueva forma de instanciar para evitar errores de exportación
    aiClient = new GoogleGenerativeAI.GoogleGenAI(API_KEY);
  } else {
    console.warn("Gemini API Key is missing.");
  }
} catch (e) {
  console.error("Failed to initialize Gemini Client", e);
}

export const createChatSession = (articleTitle: string, term: string) => {
  if (!aiClient) return null;

  const model = aiClient.getGenerativeModel({ 
    model: 'gemini-1.5-flash',
    systemInstruction: `Eres un experto en turismo. El usuario lee "${articleTitle}" y pregunta por "${term}". Responde en Español Latino.`,
  });

  return model.startChat({
    history: [],
  });
};

export const sendChatMessage = async (chat: any, message: string): Promise<string> => {
  try {
    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text() || "Lo siento, no pude generar una respuesta.";
  } catch (error) {
    console.error("Error sending message:", error);
    throw new Error("Error de conexión con la IA.");
  }
};
