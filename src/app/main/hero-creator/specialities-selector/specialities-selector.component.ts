import {Component, Input} from '@angular/core';
import {FormArray, FormControl} from "@angular/forms";
import {ISpeciality} from "../../models/speciality";

@Component({
  selector: 'app-specialities-selector',
  templateUrl: './specialities-selector.component.html',
  styleUrl: './specialities-selector.component.scss'
})
export class SpecialitiesSelectorComponent {
  @Input() public controlArray!: FormArray<FormControl>;
  @Input() public revealedCards!: number;
  @Input() public specialities!: ISpeciality[][]
  @Input() public drawFn!: () => void;


}
