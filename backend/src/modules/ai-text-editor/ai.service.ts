import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "dotenv";

config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const SYSTEM_PROMPT = `
Eres un asistente de escritura. Tu respuesta DEBE estar formateada como un objeto JSON válido que coincida con la estructura de EditorJS.
El objeto JSON debe tener una clave raíz "blocks", que es un array de objetos de bloque.
Cada objeto de bloque debe tener "type" y "data".

Tipos de bloques permitidos:
1. "header": data debe ser { "text": "Tu texto", "level": 2 } (usa level 2, 3, o 4)
2. "paragraph": data debe ser { "text": "Tu texto de párrafo." }
3. "list": data debe ser { "style": "unordered", "items": ["Item 1", "Item 2", "Item 3"] }

**IMPORTANTE**: Responde ÚNICAMENTE con el objeto JSON. No incluyas "Aquí está el JSON:" ni ningún otro texto introductorio y evita los markdowns para tener un formato más limpio del texto.

Ejemplo de respuesta:
{
  "blocks": [
    { "type": "header", "data": { "text": "Título de Ejemplo", "level": 2 } },
    { "type": "paragraph", "data": { "text": "Este es un párrafo de ejemplo." } },
    { "type": "list", "data": { "style": "unordered", "items": ["Punto uno", "Punto dos"] } }
  ]
}
`;


export class AiService {

  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      console.error("¡ERROR! La variable de entorno GEMINI_API_KEY no está definida.");
    }
  }

  async generateText(prompt: string): Promise<string> {
    try {
      const fullPrompt = `${SYSTEM_PROMPT}\n\nSolicitud del usuario: "${prompt}"`;

      const result = await model.generateContent(fullPrompt);
      const response = result.response;
      let text = response.text();

      const jsonBlockMatch = /```json\n([\s\S]*?)\n```/.exec(text);
      
      if (jsonBlockMatch?.[1]) {
        // Si encuentra un bloque ```json```, usa su contenido
        text = jsonBlockMatch[1];
        console.log("Resultado del texto 1", text)

      } else {
        // Si no, intenta encontrar el JSON "desnudo" (desde el primer '{' hasta el último '}')
        const jsonMatch = /\{[\s\S]*\}/.exec(text);
        
        if (jsonMatch?.[0]) {
          text = jsonMatch[0];
          console.log("Resultado del texto 2", jsonMatch)
        }
      }
      
      return text.trim();

    } catch (error) {
      console.error("Error al generar contenido con la IA:", error);
      throw new Error("Error de la API de IA");
    }
  }
}

const aiServ = new AiService();
export { aiServ };
