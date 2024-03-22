import { Component, Input } from '@angular/core';
import { Hero } from '../../models/Hero';
import {ConfigService} from "../../configuration/config.service";
import {Deck} from "../../models/Deck";

@Component({
  selector: 'app-hero-result-card',
  templateUrl: './hero-result-card.component.html',
  styleUrl: './hero-result-card.component.scss',
})
export class HeroResultCardComponent {
  @Input() deck?: Deck;

  constructor(public cfg: ConfigService) {
  }
}
