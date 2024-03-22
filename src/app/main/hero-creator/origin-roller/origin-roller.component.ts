import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";
import {IAttributes} from "../../models/attributes";
import {IOrigin} from "../../models/origin";

@Component({
  selector: 'app-origin-roller',
  templateUrl: './origin-roller.component.html',
  styleUrl: './origin-roller.component.scss'
})
export class OriginRollerComponent {
  @Input() control!: FormControl<any>;
  @Input() originSets: IOrigin[] = [];

  constructor() {
  }



}
