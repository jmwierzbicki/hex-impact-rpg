import {Component, Input} from '@angular/core';
import {FormArray, FormControl} from "@angular/forms";
import {Deck} from "../../models/Deck";

@Component({
  selector: 'app-improvements',
  templateUrl: './improvements.component.html',
  styleUrl: './improvements.component.scss'
})
export class ImprovementsComponent {
  @Input() public deck!: Deck
  @Input() public formArray!: FormArray<FormControl>
}
