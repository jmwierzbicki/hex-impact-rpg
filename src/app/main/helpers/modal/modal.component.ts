import {Component, HostListener, Input, TemplateRef} from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  @Input()
  title: string = '';

  @Input()
  tpl?:TemplateRef<any>;

  active: boolean = false

  open() {
    this.active = true;
  }

  @HostListener('document:keydown.escape', ['$event'])
  close() {
    this.active = false;
  }

}
