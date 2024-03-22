import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IPower} from "../../models/power";

@Component({
  selector: 'app-power-media',
  templateUrl: './power-media.component.html',
  styleUrl: './power-media.component.scss'
})
export class PowerMediaComponent {
  @Input() power!: IPower
  @Input() burn = false;
  @Input() delete = false;
  @Input() addable = false;
  @Output() onAdd: EventEmitter<IPower> = new EventEmitter();
  @Output() onDelete: EventEmitter<true> = new EventEmitter();
}
