import { Component, Input } from '@angular/core';
import { Hero } from '../../models/Hero';
import {ConfigService} from "../../configuration/config.service";

@Component({
  selector: 'app-hero-result-card',
  templateUrl: './hero-result-card.component.html',
  styleUrl: './hero-result-card.component.scss',
})
export class HeroResultCardComponent {
  @Input() hero?: Hero;

  constructor(public cfg: ConfigService) {
  }
}
