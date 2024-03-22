import {ApplicationRef, ChangeDetectorRef, Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";
import {IAttributes} from "../../models/attributes";

@Component({
  selector: 'app-attribute-scaler',
  templateUrl: './attribute-scaler.component.html',
  styleUrl: './attribute-scaler.component.scss'
})
export class AttributeScalerComponent {
  @Input() control!: FormControl<any>;
  @Input() attributeSets!: IAttributes[];


}
