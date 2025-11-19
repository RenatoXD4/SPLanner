// task-detail.ts

// 1. Asegúrate de tener estas importaciones
import { AfterViewInit, Component, OnDestroy, Inject, PLATFORM_ID, Output, Input, EventEmitter, SimpleChanges, OnChanges, inject, ViewChild, ViewContainerRef, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { Task } from '../../services/kanban-service';
import type EditorJS from '@editorjs/editorjs';
import { BlockService } from '../../services/block-service';
import { EditorJSOutputData } from '../../types/block-interfaces';
import { firstValueFrom } from 'rxjs';
import { AiService } from '../../services/aiservice';
import { AiPromptTool } from './ai-prompt-tool';

@Component({
  selector: 'app-task-detail',
  imports: [DatePipe],
  standalone: true,
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.css'
})
export class TaskDetail implements AfterViewInit, OnDestroy, OnChanges {
  
  private editor!: EditorJS | undefined;
  @Input() task: Task | null = null;
  @Input() isHidden: boolean = true;
  @Output() closePanel = new EventEmitter<void>();
  private aiService = inject(AiService)
  private blockService = inject(BlockService)
  private isEditorReady = false;
  private cdr = inject(ChangeDetectorRef);
  @Input() estadoNombre: string | null = null;
  @Input() rolMiembro: string | null = null;
  @ViewChild('mensajeContainer', { read: ViewContainerRef }) mensajeContainer!: ViewContainerRef;
  @ViewChild('mensajeTemplate', { read: TemplateRef }) mensajeTemplate!: TemplateRef<any>;
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId) && !this.isHidden && !this.editor) {
      this.initEditor();
    }
  }

  mostrarMensaje(msg: string): void {
    const view = this.mensajeContainer.createEmbeddedView(this.mensajeTemplate, { $implicit: msg });
    setTimeout(() => {
      view.destroy();
      this.cdr.detectChanges();
    }, 3000);
    this.cdr.detectChanges();
  }

  rolMiembroVerificar(): boolean {
    return this.rolMiembro === 'Administrador' || this.rolMiembro === 'Editor';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (isPlatformBrowser(this.platformId)) {
        if (changes['isHidden']) {
          const isNowHidden = changes['isHidden'].currentValue;
          if (isNowHidden && this.editor) {
            //Destruir el editor si este se cierra
            this.destroyEditor();
          } else if (!isNowHidden && !this.editor) {
            //Inicializarlo si se abre en otra parte
            this.initEditor();
          }
      }

      if (changes['task'] && this.editor && !changes['task'].firstChange && this.isEditorReady) {
        // Si se cambia de tarea mientras el edtiro está abierto, se tendrá que recargar el otro editor de texto.
        this.reloadEditorData();
      }
    }
  }

  ngOnDestroy(): void {
    this.destroyEditor();
  }

  private destroyEditor(): void {
    if (this.editor && this.isEditorReady) {
      this.editor.destroy();
    }

    this.editor = undefined;
    this.isEditorReady = false;
  }

  private async initEditor(): Promise<void> {
    
    if (this.editor || !isPlatformBrowser(this.platformId)) {
      return;
    }

    let datosParaCargar: EditorJSOutputData = { time: 0, blocks: [], version: '' };

    if (this.task) {
      try {
        datosParaCargar = await firstValueFrom(
          this.blockService.obtenerBloquesDeTarea(this.task.id)
        );
        console.log('Bloques cargados:', datosParaCargar);
      } catch (error) {
        console.error('Error al cargar bloques existentes:', error);
      }
    }

    const EditorJS = (await import('@editorjs/editorjs')).default;
    const Header = (await import('@editorjs/header')).default; 
    const List = (await import('@editorjs/list')).default;
    const aiServiceInstance = this.aiService;

    this.editor = new EditorJS({
      holder: 'editorjs-container',
      tools: {
        header: {
          class: Header as any,
          config: {
            placeholder: 'Ingresa un encabezado',
            levels: [2, 3, 4],
            defaultLevel: 3
          },
          toolbox: {
            title: "Encabezado"
          }
        },
        list: {
          class: List as any,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered'
          },
          toolbox: {
            title: "Lista"
          }
        },
        aiPrompt: {
          class: AiPromptTool,
          config: {
            generateText: (prompt: string) => {
              return firstValueFrom(aiServiceInstance.generateText(prompt));
            }
          }
        }
      },
      i18n: {
        messages: {
            ui: {
              "popover": {
              "Filter": "Filtro",
              "Nothing found": "No encontrado",
              "Convert to": "Convertir a",
            }
          },
          blockTunes: {
              "delete": {
                "Delete": "Eliminar",
                "Click to delete": "Click para eliminar"
              },
              "moveUp": {
                "Move up": "Mover arriba"
              },
              "moveDown": {
                "Move down": "Mover abajo"
              }
          },
            // Traducciones específicas de las herramientas (como Header)
          toolNames: {
            "Text": "Texto",
          },
          tools: {
              header: {
                'Heading 2': 'Título 2',
                'Heading 3': 'Título 3', 
                'Heading 4': 'Título 4', 
              },
              list: {
              "Ordered": "Lista ordenada",
              "Unordered": "Lista desordenada",
              "Checklist": "Lista de tareas",
              },
          }
        }
      },
      readOnly: !this.rolMiembroVerificar(),
      data: datosParaCargar,
      placeholder: this.rolMiembroVerificar() ? 'Empieza escribiendo aquí' : "",
      onReady: () => {
        this.isEditorReady = true;
      }
    });
  }

  private async reloadEditorData(): Promise<void> {
    if (!this.editor || !this.task || !this.isEditorReady) {
      console.warn('Intento de recarga de editor sin instancia o sin tarea.');
      return;
    }

    try {
      const datosParaCargar = await firstValueFrom(
        this.blockService.obtenerBloquesDeTarea(this.task.id)
      );
      
      console.log('Recargando editor con nuevos datos:', datosParaCargar);

      this.editor.clear(); 
      this.editor.render(datosParaCargar);

    } catch (error) {
      console.error('Error al recargar los bloques del editor:', error);
    }
  }


  async saveEditorData(): Promise<void> {
    if (!this.editor || !this.task || !this.isEditorReady) {
      console.error('Editor no inicializado o no hay tarea seleccionada');
      return;
    }
    
    try {
      const outputData = await this.editor.save();
      
      this.blockService.actualizarBloquesDeTarea(this.task.id, outputData as any)
        .subscribe({
          next: (respuesta) => {
            this.mostrarMensaje("Cambios guardados exitosamente")
            console.log('Bloques guardados exitosamente:', respuesta);
          },
          error: (err) => {
            console.error('Error al guardar los bloques:', err);
          }
        });

    } catch (error) {
      console.error('Error al obtener datos de EditorJS:', error);
    }
  }
  
}