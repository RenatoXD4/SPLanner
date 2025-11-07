import { Prisma, TipoDeBloque } from "@prisma/client";

import { BlocksRepository } from "./blocks.repository.js";
import { EditorJSBlockData, EditorJSOutputData } from "./interface.js";

export class BlocksService {
  private bloquesRepository: BlocksRepository;

  constructor() {
    this.bloquesRepository = new BlocksRepository();
  }

  async actualizarBloques(tareaId: string, outputData: EditorJSOutputData) {
    const bloquesParaCrear: Prisma.BloqueContenidoCreateManyInput[] =
      outputData.blocks.map((block, index) => {
        const tipo = mapEditorJsTipoAEnum(block.type, block.data);

        const contenido = JSON.stringify(block.data);

        return {
          contenido: contenido,
          posicion: index,
          tareaId: tareaId,
          tipo: tipo,
        };
      });

    return this.bloquesRepository.actualizarBloquesDeTarea(
      tareaId,
      bloquesParaCrear
    );
  }
  
  async obtenerBloques(tareaId: string): Promise<EditorJSOutputData> {
    
    const bloquesDB = await this.bloquesRepository.obtenerBloquesPorTareaId(tareaId);

    const bloquesEditorJS = bloquesDB.map((bloque) => {
      let data: EditorJSBlockData;
      
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data = JSON.parse(bloque.contenido); 
      } catch (e) {
        console.error(`Error al parsear contenido del bloque ${bloque.id}:`, e);
        data = { text: "Error: Contenido del bloque dañado." }; 
      }

      return {
        data: data,
        id: bloque.id, 
        type: mapEnumAEditorJsTipo(bloque.tipo),
      };
    });

    return {
      blocks: bloquesEditorJS,
      time: Date.now(),
      version: "2.31.0", 
    };
  }
}

function mapEditorJsTipoAEnum(
  type: string,
  data: EditorJSBlockData
): TipoDeBloque {
  switch (type) {
    case "checklist":
      return "CHECKLIST";
    case "code":
      return "CODE";

    case "header":
      if (data.level === 1) return "HEADING_1";
      if (data.level === 2) return "HEADING_2";
      // Tu enum no tiene HEADING_3, HEADING_4, pero tu frontend sí (2, 3, 4).
      // Asumiré que niveles 3 y 4 también se guardan como HEADING_2.
      return "HEADING_2";
    case "image":
      return "IMAGE";
    case "list":
      // ¡IMPORTANTE! Tu enum tiene CHECKLIST pero tu frontend usa 'List'.
      // Asumiré que 'list' se mapea a 'CHECKLIST'.
      // Si añades la herramienta 'Checklist' de EditorJS, su 'type' será 'checklist'.
      return "CHECKLIST";
    case "paragraph":
      return "PARAGRAPH";
    default:
      console.warn(`Tipo de bloque desconocido: ${type}, usando PARAGRAPH`);
      return "PARAGRAPH";
  }
}

function mapEnumAEditorJsTipo(tipo: TipoDeBloque): string {
  switch (tipo) {
    case 'CHECKLIST':
      return 'list';
    case 'CODE':
      return 'code';
    case 'HEADING_1':
      return 'header';
    case 'HEADING_2':
      return 'header'; 
    case 'IMAGE':
      return 'image';
    case 'PARAGRAPH':
      return 'paragraph';
    default:
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.warn(`Tipo de enum desconocido: ${tipo}, usando 'paragraph'`);
      return 'paragraph';
  }
}


const blockSer = new BlocksService();
export { blockSer };
