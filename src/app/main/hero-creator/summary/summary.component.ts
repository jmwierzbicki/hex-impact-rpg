import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Deck} from "../../models/Deck";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {IPower} from "../../models/power";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent implements OnInit, OnDestroy {
  @Input() public deck!: Deck
  @Input() public form!: FormGroup;

  $destroy = new Subject()


  public attributes: { [key: string]: number } = {};
  public powers: IPower[] = [];
  public extraPowers: IPower[] = [];



  ngOnInit() {

    this.form.valueChanges.pipe(takeUntil(this.$destroy)).subscribe((val) => {
      this.powers = [];
      const tmpPowers: IPower[] = []
      // console.log(val)
      Object.entries(val?.powers as { [key: string]: IPower[] }).forEach(([key, value]) => {
        tmpPowers.push(...value.filter(p => p))
      })
      tmpPowers.forEach(pwr => {
        const id = pwr.id
        pwr.samePowerCount = tmpPowers.filter(pwr => pwr.id === id).length
      })
      this.powers = tmpPowers.filter((obj, index, self) =>
          index === self.findIndex((el) => (
            el.id === obj.id
          ))
      );
    })
  }

  ngOnDestroy() {
    this.$destroy.next(true);
    this.$destroy.complete();
  }

  constructor(public userService: UserService) {
  }
}
