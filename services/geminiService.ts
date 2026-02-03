import { GoogleGenAI } from '@google/generative-ai';

// Usamos la variable de entorno configurada en Vercel con el prefijo VITE_
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

let aiClient: GoogleGenAI | null = null;

try {
  if (API_KEY) {
    // Inicialización simple para Google AI Studio (sin vertexai: true)
    aiClient = new GoogleGenAI(API_KEY);
  } else {
    console.warn("Gemini API Key is missing. AI features will not work.");
  }
} catch (e) {
  console.error("Failed to initialize Gemini Client", e);
}

export const createChatSession = (articleTitle: string, term: string) => {
  if (!aiClient) return null;

  // Ajustamos al modelo 1.5-flash que es el compatible con la API Key gratuita
  const model = aiClient.getGenerativeModel({ 
    model: 'gemini-1.5-flash',
    systemInstruction: `
      Eres un experto en turismo y viajes, actuando como un guía virtual inteligente.
      El usuario está leyendo un artículo titulado "${articleTitle}".
      El usuario ha seleccionado el término o frase: "${term}".
      
      Tu objetivo es:
      1. Explicar qué es "${term}" y por qué es relevante en el contexto de este artículo.
      2. Responder cualquier pregunta adicional que el usuario tenga sobre este término, el lugar, la persona o el concepto.
      3. Mantener un tono conversacional, amigable y educativo.
      4. Responder SIEMPRE en Español Latinoamericano.
      5. Si te preguntan sobre algo no relacionado con turismo o el artículo, trata de redirigir el tema suavemente.
    `,
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
