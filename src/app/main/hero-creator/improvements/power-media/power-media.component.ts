import {Component, Input} from '@angular/core';
import {IPower} from "../../../models/power";

@Component({
  selector: 'app-power-media',
  templateUrl: './power-media.component.html',
  styleUrl: './power-media.component.scss'
})
export class PowerMediaComponent {
  @Input() power!: IPower
}
