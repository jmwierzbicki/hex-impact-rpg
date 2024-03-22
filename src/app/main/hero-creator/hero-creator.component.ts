import {Component, OnInit} from '@angular/core';
import {HeroBuilderService, STEPS} from '../services/hero-builder.service';
import {DataBaseService} from '../services/data-base.service';
import {Deck} from "../models/Deck";
import {RandomizerApiService} from "../services/randomizer-api.service";
import {ConfigService} from "../configuration/config.service";
import {filter, firstValueFrom} from "rxjs";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RNG} from "../helpers/rng";

@Component({
  selector: 'app-hero-creator',
  templateUrl: './hero-creator.component.html',
  styleUrl: './hero-creator.component.scss',
  providers: [HeroBuilderService],
})
export class HeroCreatorComponent implements OnInit {
  public STEPS = STEPS;
  public formStep: STEPS = STEPS.ROLL_ATTRS;
  public deck: Deck = new Deck();

  public specialityCardDrawn: number = this.cfg.config.specialities.initialChoices;
  public powerCardsDrawn: {[key: string]: number} = {};

  public heroCreatorForm = new FormGroup({
    attributes: new FormControl(),
    origin: new FormControl(),
    specialities: new FormArray(Array(this.specialityCardDrawn).fill(null).map(() => new FormControl(null,[Validators.required]))),
    powers: new FormGroup({}),
    improvements: new FormArray([]),
  })

  get improvementForm() {
    return this.heroCreatorForm.get('improvements') as FormArray
  }

  powerForm(type: string): FormArray {
    return this.heroCreatorForm.controls.powers.get(type) as FormArray
  }


  constructor(
    public db: DataBaseService,
    public heroBuilder: HeroBuilderService,
    private randomizer: RandomizerApiService,
    private cfg: ConfigService
  ) {
  }

  async ngOnInit() {
    if (!this.db.dbPopulated.value) {
      await firstValueFrom(this.db.dbPopulated.pipe(filter(value => value)));
    }
    RNG.resetCounter()
    this.deck.attributes = this.randomizer.getAttributeSets(
      this.cfg.config.attributes,
    );
    this.deck.origin = this.randomizer.getOriginSet(
      this.cfg.config.careers,
    );
    this.deck.specialitiesSets = this.randomizer.getSpecialitySets(
      this.cfg.config.specialities,
    );

    const powers = this.randomizer.getRandomPowerSets(
      this.cfg.config.powers,
    );
    this.deck.powerSets = powers.powerSets
    this.deck.powerTypes = powers.powerTypes

    console.log(this.deck.powerSets)

    this.deck.improvements = this.randomizer.getRandomImprovements(
      this.cfg.config.improvements,
    );

    console.log(this.deck)



    this.deck.powerTypes.forEach(pwrType => {
      this.powerCardsDrawn[pwrType] = 0
      this.heroCreatorForm.controls.powers.addControl(pwrType, new FormArray([]))
    })
    this.deck.improvements.forEach(improvement => {this.improvementForm.push(new FormControl(false))})

  }

  drawSpecialityCard() {
    if (this.specialityCardDrawn >= this.deck.specialitiesSets.length) {
      return;
    }
    this.specialityCardDrawn++
    this.heroCreatorForm.controls.specialities.push(new FormControl(null, [Validators.required]))
  }

  drawPowerCard(type: string) {
    if (this.powerCardsDrawn[type] >= this.deck.powerSets.get(type)?.sets.length!) {
      return;
    }
    this.powerCardsDrawn[type]++
    this.powerForm(type).push(new FormControl(null, [Validators.required]))
  }

  undrawPowerCard(type: string) {
    if (this.powerCardsDrawn[type] > 0) {
      this.powerCardsDrawn[type]--;
      this.powerForm(type).removeAt(this.powerForm(type).length - 1);
    }
  }


}
