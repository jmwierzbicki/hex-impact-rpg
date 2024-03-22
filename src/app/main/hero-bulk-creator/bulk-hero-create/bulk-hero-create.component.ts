import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RandomizerApiService } from '../../services/randomizer-api.service';
import { Hero } from '../../models/Hero';
// @ts-ignore
import { generateId } from 'zoo-ids';
// @ts-ignore
import html2pdf from 'html2pdf.js';
import { ConfigService } from '../../configuration/config.service';

import prand from 'pure-rand';
import {RNG} from "../../helpers/rng";
import {Deck} from "../../models/Deck";

@Component({
  selector: 'app-bulk-hero-create',
  templateUrl: './bulk-hero-create.component.html',
  styleUrl: './bulk-hero-create.component.scss',
})
export class BulkHeroCreateComponent {
  form = new FormGroup({
    count: new FormControl(1),
  });

  decks: Deck[] = [];

  constructor(
    public randomizer: RandomizerApiService,
    private cfg: ConfigService,
  ) {}

  generateTemplates() {
    console.log(this.cfg.config)
    // RNG.toggleSeed(false);
    this.decks = [];
    let count = this.form.value.count || 1;
    for (let i = 0; i < count; i++) {
      const deck = new Deck();
      deck.attributes = this.randomizer.getAttributeSets(
        this.cfg.config.attributes,
      );
      deck.origin = this.randomizer.getOriginSet(
        this.cfg.config.careers,
      );
      deck.specialitiesSets = this.randomizer.getSpecialitySets(
        this.cfg.config.specialities,
      );
      deck.powerSets = this.randomizer.getRandomPowerSets(
        this.cfg.config.powers,
      ).powerSets;
      deck.improvements = this.randomizer.getRandomImprovements(
        this.cfg.config.improvements,
      );

      deck.name = generateId(null, {
        caseStyle: 'titlecase',
        delimiter: ' ',
      });
      this.decks.push(deck);
    }
    RNG.toggleSeed(true);
  }

  print() {
    if (!document) return;
    let divContent = document.getElementById('character-container');
    let allContent = document.getElementsByTagName('html')[0].outerHTML;
    let myWindow = window.open('', '');

    if (myWindow && divContent) {
      myWindow.document.write(allContent);
      myWindow.document.close();

      let element = myWindow.document.getElementsByTagName('app-root');
      element[0].remove();
      let body = myWindow.document.getElementsByTagName('body');
      body[0].appendChild(divContent.cloneNode(true));
      body[0].classList.add('printable-page');
      // myWindow.document.getElementsByTagName('app-root')[0].innerHTML = '';
      // // for (let head of headsIterable) {
      // //   myWindow.document.write(`${head.outerHTML}`);
      // // }
      // //
      // // myWindow.document.write('</head><body >');
      // // myWindow.document.write(divContent);
      // // myWindow.document.write('</body></html>');
      // // necessary for IE >= 10
      myWindow.onload = function () {
        // necessary if the div contain images
        myWindow?.focus(); // necessary for IE >= 10
        myWindow?.print();
        // myWindow?.close();
      };
    }
  }

  rng() {
    // RNG.resetCounter()
    let a = 0

    let dice = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    }
    for (let i = 0; i < 1000000; i++) {
      let result = RNG.generate(6)
      // @ts-ignore
      dice[result]++
    }
    console.log(dice)


  }
  resetRng() {
  }

}
