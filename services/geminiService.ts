import { GoogleGenAI, Chat } from '@google/genai';

// NOTE: In a real production app, this key should be proxied through a backend.
// For this demo, we assume it's available in the environment.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

let aiClient: GoogleGenAI | null = null;

try {
  if (API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: API_KEY, vertexai: true });
  } else {
    console.warn("Gemini API Key is missing. AI features will not work.");
  }
} catch (e) {
  console.error("Failed to initialize Gemini Client", e);
}

export const createChatSession = (articleTitle: string, term: string): Chat | null => {
  if (!aiClient) return null;

  const systemInstruction = `
    Eres un experto en turismo y viajes, actuando como un guía virtual inteligente.
    El usuario está leyendo un artículo titulado "${articleTitle}".
    El usuario ha seleccionado el término o frase: "${term}".
    
    Tu objetivo es:
    1. Explicar qué es "${term}" y por qué es relevante en el contexto de este artículo.
    2. Responder cualquier pregunta adicional que el usuario tenga sobre este término, el lugar, la persona o el concepto.
    3. Mantener un tono conversacional, amigable y educativo.
    4. Responder SIEMPRE en Español Latinoamericano.
    5. Si te preguntan sobre algo no relacionado con turismo o el artículo, trata de redirigir el tema suavemente.
  `;

  return aiClient.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: systemInstruction,
    }
  });
};

export const sendChatMessage = async (chat: Chat, message: string): Promise<string> => {
  try {
    const response = await chat.sendMessage({ message });
    return response.text || "Lo siento, no pude generar una respuesta.";
  } catch (error) {
    console.error("Error sending message:", error);
    throw new Error("Error de conexión con la IA.");
  }
};
