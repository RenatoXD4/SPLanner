// task-detail.ts

// 1. Asegúrate de tener estas importaciones
import { AfterViewInit, Component, OnDestroy, Inject, PLATFORM_ID, Output, Input, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { Task } from '../../services/kanban-service';
import type EditorJS from '@editorjs/editorjs';

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
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId) && !this.isHidden && !this.editor) {
      this.initEditor();
    }
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
    }
  }

  ngOnDestroy(): void {
    this.destroyEditor();
  }

  private destroyEditor(): void {
    if (this.editor) {
      this.editor.destroy();
      this.editor = undefined;
    }
  }

  private async initEditor(): Promise<void> {
    
    if (this.editor || !isPlatformBrowser(this.platformId)) {
      return;
    }
    const EditorJS = (await import('@editorjs/editorjs')).default;
    const Header = (await import('@editorjs/header')).default; 
    const List = (await import('@editorjs/list')).default;

    this.editor = new EditorJS({
      holder: 'editorjs-container',
      tools: {
        header: {
          class: Header as any,
          config: {
            placeholder: 'Ingresa un encabezado',
            levels: [2, 3, 4],
            defaultLevel: 3
          }
        },
        list: {
          class: List as any,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered'
          }
        }
      },
      placeholder: 'Empieza escribiendo aquí',
      onChange: async () => {
        // El guardado solo ocurrirá en el navegador, lo cual es correcto
        const outputData = await this.editor!.save();
        console.log('Datos guardados:', outputData);
      },
    });
  }
  
}