import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataBaseService} from "../../services/data-base.service";
import {filter, firstValueFrom} from "rxjs";
import {IPower} from "../../models/power";

@Component({
  selector: 'app-power-browser',
  templateUrl: './power-browser.component.html',
  styleUrl: './power-browser.component.scss'
})
export class PowerBrowserComponent implements OnInit {
  @Input() addable = false
  @Output() onAdd: EventEmitter<IPower> = new EventEmitter()

  searchTerm = ''
  filteredPowers: IPower[] = [...this.db.powers]

  constructor(public db: DataBaseService) {
  }

  async ngOnInit() {
    await firstValueFrom(this.db.dbPopulated.pipe(filter(value => value)));
    this.search();
  }

  search(): void {
    if (this.searchTerm) {
      this.filteredPowers = this.db.powers.filter(power =>
        power.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        power.type.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredPowers = [...this.db.powers];
    }
  }

}
