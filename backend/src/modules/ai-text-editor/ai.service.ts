import { GoogleGenerativeAI } from "@google/generative-ai";



const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });


export class AiService {

  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      console.error("¡ERROR! La variable de entorno GEMINI_API_KEY no está definida.");
    }
  }

  async generateText(prompt: string): Promise<string> {
    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      return text;

    } catch (error) {
      console.error("Error al generar contenido con la IA:", error);
      throw new Error("Error de la API de IA");
    }
  }
}

const aiServ = new AiService();
export { aiServ };
