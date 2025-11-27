import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskUI } from '../../types/kanban-interfaces';

@Component({
  selector: 'app-traceability',
  imports: [CommonModule],
  templateUrl: './traceability.html',
  styleUrl: './traceability.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Traceability {

  @Input({ required: true }) task!: TaskUI;

}
