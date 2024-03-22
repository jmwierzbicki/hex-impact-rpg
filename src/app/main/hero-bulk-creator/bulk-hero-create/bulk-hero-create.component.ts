import {Component, ViewChild} from '@angular/core';
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
import slugify from "slugify";
import {ConfigurationComponent} from "../../configuration/configuration.component";

@Component({
  selector: 'app-bulk-hero-create',
  templateUrl: './bulk-hero-create.component.html',
  styleUrl: './bulk-hero-create.component.scss',
})
export class BulkHeroCreateComponent {
  form = new FormGroup({
    seed: new FormControl(''),
  });

  @ViewChild('configForm') public configFormComponent?: ConfigurationComponent

  decks: Deck[] = [];
  activeTab: 'Generator' | 'Configure' = 'Generator'

  get cfg() {
    if (this.configFormComponent && this.configFormComponent.configForm.dirty) {
      return this.configFormComponent.configForm.value as any
    }
    return this.configService.config
  }

  constructor(
    public randomizer: RandomizerApiService,
    private configService: ConfigService,
  ) {}

  generateTemplates() {
    const deck = new Deck();
    let seed: string = this.form.controls.seed.value || generateId(null, {
      caseStyle: 'titlecase',
      delimiter: ' ',
    });
    seed = slugify(seed, {
      remove: undefined,
      lower: true,
      strict: true,
      trim: true
    })
    RNG.setRngSeed(seed);
    deck.name=seed

    this.decks = [];
    let count = this.form.value.seed || 1;

    deck.attributes = this.randomizer.getAttributeSets(
      this.cfg.attributes,
    );
    deck.origin = this.randomizer.getOriginSet(
      this.cfg.careers,
    );
    deck.specialitiesSets = this.randomizer.getSpecialitySets(
      this.cfg.specialities,
    );
    deck.powerSets = this.randomizer.getRandomPowerSets(
      this.cfg.powers,
    ).powerSets;
    deck.improvements = this.randomizer.getRandomImprovements(
      this.cfg.improvements,
    );
    this.decks.push(deck);
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


}
