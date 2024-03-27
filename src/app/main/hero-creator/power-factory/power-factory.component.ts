import {Component, Input} from '@angular/core';
import {PowerSets} from "../../models/power";
import {FormArray, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-power-factory',
  templateUrl: './power-factory.component.html',
  styleUrl: './power-factory.component.scss'
})
export class PowerFactoryComponent {
  @Input() public powerTypes!: string[];
  @Input() public powers!: PowerSets;
  @Input() public powersDrawn!: { [key: string]: number };
  @Input() public drawFn!: (type: string) => void;
  @Input() public undrawFn!: (type: string) => void;
  @Input() public powerForm!: FormGroup;

  currentType: string = '';

  getPowerControl(type: string, index: number): FormControl {
    return (this.powerForm.get(type) as FormArray).at(index) as FormControl;
  }

  powersByType(type: string) {
    // console.log(this.powers)
    return this.powers.get(type)?.sets;
  }
}
