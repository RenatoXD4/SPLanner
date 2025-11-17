// src/app/editorjs-tools/ai-prompt-tool.ts
import { BlockTool, BlockToolConstructorOptions, API } from '@editorjs/editorjs';
import { EditorJSOutputData } from '../../types/block-interfaces';

interface AiPromptToolConfig {
  generateText: (prompt: string) => Promise<string>;
}

export class AiPromptTool implements BlockTool {
  private api: API;
  private config?: AiPromptToolConfig;
  private wrapper: HTMLDivElement;
  private input: HTMLInputElement;
  private button: HTMLButtonElement;

  static get toolbox() {
    return {
      title: 'Asistente IA',
      icon: '✨' 
    };
  }

  private readOnly: boolean;

  // 1. Getter estático
  static get isReadOnlySupported(): boolean {
    return true;
  }

  constructor({ api, config, readOnly }: BlockToolConstructorOptions<any, AiPromptToolConfig>) {
    this.api = api;
    this.config = config;

    this.wrapper = document.createElement('div');
    this.input = document.createElement('input');
    this.button = document.createElement('button');
    this.readOnly = readOnly;
  }

  render(): HTMLDivElement {

    // 📍 ¡Este es el cambio principal!
    // Invertimos la lógica.

    if (this.readOnly) {
      this.wrapper.className = 'ai-prompt-wrapper-readonly'; 

    } else {
      this.wrapper.className = 'ai-prompt-wrapper';
      this.input.placeholder = 'Escribe tu prompt para la IA... (ej. "resume este texto en 3 puntos")';
      this.input.className = 'ai-prompt-input';
      this.button.textContent = 'Generar';
      this.button.className = 'ai-prompt-button';

      this.button.addEventListener('click', this.handleGenerateClick);

      this.wrapper.appendChild(this.input);
      this.wrapper.appendChild(this.button);
    }

    // Retornamos el wrapper en ambos casos
    return this.wrapper;
  }

  private handleGenerateClick = async () => {
    const prompt = this.input.value;
    if (!prompt) return;

    this.button.disabled = true;
    this.button.textContent = 'Pensando...';
    this.input.disabled = true;

    try {
      const generatedText = await this.config?.generateText(prompt);

      const currentBlockIndex = this.api.blocks.getCurrentBlockIndex();

      let dataToInsert: EditorJSOutputData | null = null;
      try {
        dataToInsert = JSON.parse(generatedText!) as EditorJSOutputData;
      } catch (e) {
        console.warn('La respuesta de la IA no es JSON. Se insertará como texto plano.');
        dataToInsert = null;
      }

      if (dataToInsert && dataToInsert.blocks && Array.isArray(dataToInsert.blocks)) {
        
        dataToInsert.blocks.forEach((block, index) => {
          this.api.blocks.insert(
            block.type,     
            block.data,     
            {},             
            currentBlockIndex + 1 + index, 
            index === 0     
          );
        });

      } else {
        
        this.api.blocks.insert(
          'paragraph',
          { text: generatedText }, 
          {},
          currentBlockIndex + 1,
          true
        );
      }

      this.api.blocks.delete(currentBlockIndex);

    } catch (error) {
      console.error("Error al generar texto desde la IA:", error);

      this.button.disabled = false;
      this.input.disabled = false;
      this.button.textContent = 'Generar';
      this.api.notifier.show({
        message: 'Error al contactar la IA. Intenta de nuevo.',
        style: 'error'
      });
    }
  }
  
  save() {
    return null;
  }
}