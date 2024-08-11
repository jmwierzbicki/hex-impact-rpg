import {ApplicationRef, ChangeDetectorRef, Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";
import {IAttributes} from "../../models/attributes";
import {IOrigin} from "../../models/origin";

@Component({
  selector: 'app-attribute-origin-selector',
  templateUrl: './attribute-origin-selector.component.html',
  styleUrl: './attribute-origin-selector.component.scss'
})
export class AttributeOriginSelectorComponent {
  @Input() control!: FormControl<any>;
  @Input() attributeSets!: IAttributes[];


  @Input() originControl!: FormControl<any>;
  @Input() originSets: IOrigin[] = [];

}
