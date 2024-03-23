import {Component, Input} from '@angular/core';
import {IAttributes} from "../../models/attributes";

@Component({
  selector: 'app-attribute-set',
  templateUrl: './attribute-set.component.html',
  styleUrl: './attribute-set.component.scss'
})
export class AttributeSetComponent {
  @Input() attributes?: IAttributes
}
