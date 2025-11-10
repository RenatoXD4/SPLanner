export interface EditorJSBlock {
  data: EditorJSBlockData;
  id: string;
  type: string; 
}

export interface EditorJSBlockData {
  // Aquí puedes añadir más tipos de 'data' (image, code, etc.)
  [key: string]: unknown; // Para ser flexibles
  items?: string[];
  level?: number;
  style?: 'ordered' | 'unordered';
  text?: string;
}

export interface EditorJSOutputData {
  blocks: EditorJSBlock[];
  time: number;
  version: string;
}