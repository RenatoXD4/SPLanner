import { Request, Response } from 'express';
import ogs from 'open-graph-scraper';

import { BlocksService } from "./blocks.services.js";
import { EditorJSOutputData } from "./interface.js";


export class BlocksController {
  constructor(private bloquesService: BlocksService) {}

  public fetchImageUrl = (req: Request, res: Response) => {
    try {
      const { url } = req.body as {url: string}; // EditorJS envía la URL en el body

      if (!url) {
        return res.status(400).json({ message: 'URL no proporcionada', success: 0 });
      }
      
      return res.status(200).json({
        file: {
          url: url,
        },
        success: 1
      });

    } catch (error) {
      console.error('Error fetching image url:', error);
      return res.status(500).json({ message: 'Error procesando URL', success: 0 });
    }
  }

  public fetchUrlData = async (req: Request, res: Response) => {
    const url = req.query.url as string;

    // 1. Validación básica
    if (!url) {
      return res.status(400).json({ message: "URL faltante", success: 0 });
    }

    try {
      // 2. Configuración con User-Agent para evitar bloqueos (Error 403/500 de la web destino)
      const options = {
        fetchOptions: {
          headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'
          }
        },
        timeout: 5000, // 5 segundos máximo para no colgar tu servidor
        url: url
      };

      const { result } = await ogs(options);

      // 3. Respuesta Exitosa
      return res.status(200).json({
        link: url,
        meta: {
          description: result.ogDescription ?? result.twitterDescription ?? result.dcDescription ?? '',
          image: {
            url: (result.ogImage?.[0]?.url ?? result.twitterImage?.[0]?.url) ?? ''
          },
          title: (result.ogTitle ?? (result.twitterTitle) ?? result.dcTitle) ?? 'Sin título'
        },
        success: 1
      });

    } catch {
      // 4. MANEJO DE ERROR (El "Salvavidas")
      // Si ogs falla (la web está caída, es privada, etc.), NO devolvemos 500.
      // Devolvemos success: 1 pero con datos vacíos para que EditorJS cree el bloque igual.
      
      console.warn(`[LinkPreview] Falló al obtener datos de ${url}. Usando fallback.`);
      
      return res.status(200).json({
        link: url,
        meta: {
          description: '',
          image: { url: '' },
          title: url // Usamos la URL como título
        },
        success: 1
      });
    }
  }

  public handleActualizarBloques = async (req: Request, res: Response): Promise<void> => {
    try {
      const { tareaId, usuarioId } = req.params;
      
      const outputData = req.body as EditorJSOutputData; 

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!outputData || !Array.isArray(outputData.blocks)) {
        res.status(400).json({ 
          message: 'Cuerpo de la petición inválido.' 
        });
        return;
      }

      const bloquesActualizados = await this.bloquesService.actualizarBloques(tareaId, outputData, usuarioId);
      res.status(200).json(bloquesActualizados);

    } catch (error) {
      console.error('Error al actualizar bloques:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  public handleObtenerBloques = async (req: Request, res: Response): Promise<void> => {
    try {
      const { tareaId } = req.params;
      
      const outputData = await this.bloquesService.obtenerBloques(tareaId);
      
      res.status(200).json(outputData);

    } catch (error) {
      console.error('Error al obtener bloques:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  public uploadImage = (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No se subió ningún archivo', success: 0 });
      }

      // Construimos la URL pública (Ajusta 'http://localhost:3000' a tu dominio en producción)
      // Asumimos que sirves la carpeta 'uploads' estáticamente
      const baseUrl = 'http://localhost:9001'; // O usa process.env.API_URL
      const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;

      return res.status(200).json({
        file: {
          url: fileUrl,
          // Opcional: puedes devolver width, height, etc.
        },
        success: 1
      });

    } catch (error) {
      console.error('Error subiendo imagen:', error);
      return res.status(500).json({ message: 'Error interno', success: 0 });
    }
  }

}