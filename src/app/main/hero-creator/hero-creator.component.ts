import { Component } from '@angular/core';
import { HeroBuilderService, STEPS } from '../services/hero-builder.service';
import { Hero } from '../models/Hero';
import { DataBaseService } from '../services/data-base.service';

@Component({
  selector: 'app-hero-creator',
  templateUrl: './hero-creator.component.html',
  styleUrl: './hero-creator.component.scss',
  providers: [HeroBuilderService],
})
export class HeroCreatorComponent {
  public STEPS = STEPS;
  public formStep: STEPS = 0;
  public hero: Hero;
  constructor(
    public db: DataBaseService,
    public heroBuilder: HeroBuilderService,
  ) {
    heroBuilder.step = 0;
    this.hero = heroBuilder.hero;
  }

  public nextStep() {
    if (this.formStep < Object.keys(STEPS).length / 2 - 1) {
      this.formStep++;
    }
  }

  public previousStep() {
    if (this.formStep > 0) {
      this.formStep--;
    }
  }
}
