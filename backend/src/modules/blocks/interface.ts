export interface EditorJSBlock {
  data: EditorJSBlockData;
  id: string;
  type: string; 
}

export interface EditorJSBlockData {
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