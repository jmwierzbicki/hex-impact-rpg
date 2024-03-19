import { Component } from '@angular/core';
import { DataBaseService } from './services/data-base.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  constructor(private database: DataBaseService) {}
}
