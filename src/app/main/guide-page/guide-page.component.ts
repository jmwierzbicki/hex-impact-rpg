import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";

@Component({
  selector: 'app-guide-page',
  templateUrl: './guide-page.component.html',
  styleUrl: './guide-page.component.scss'
})
export class GuidePageComponent{

  guide = this.client.get('/assets/guide.md', {
    responseType: 'text',
  })

  constructor(public client: HttpClient) {

  }

}
