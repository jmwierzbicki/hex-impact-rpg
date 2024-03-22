import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Deck} from "../../models/Deck";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {HeroBuilderService} from "../../services/hero-builder.service";
import {Subject, takeUntil} from "rxjs";
import {ConfigService} from "../../configuration/config.service";
import {IPower} from "../../models/power";

@Component({
  selector: 'app-improvements',
  templateUrl: './improvements.component.html',
  styleUrl: './improvements.component.scss'
})
export class ImprovementsComponent implements OnInit, OnDestroy {
  @Input() public deck!: Deck
  @Input() public formArray!: FormArray<FormControl>
  @Input() public form!: FormGroup;

  $destroy = new Subject()


  public attributes: { [key: string]: number } = {};
  public powers: IPower[] = [];
  public extraPowers: IPower[] = [];



  ngOnInit() {
   
    this.form.valueChanges.pipe(takeUntil(this.$destroy)).subscribe((val) => {
      this.powers = [];
      const tmpPowers: IPower[] = []
      console.log(val)
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
}
