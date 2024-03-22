import {Component, EventEmitter, HostListener, Input, Output, TemplateRef} from '@angular/core';

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

  @Input() public confirmLabel?: string;
  @Input() public closeLabel = 'Close'

  @Output() public onConfirm: EventEmitter<boolean> = new EventEmitter()
  @Output() onClose = new EventEmitter<boolean>();

  open() {
    this.active = true;
  }

  @HostListener('document:keydown.escape', ['$event'])
  close() {
    this.active = false;
  }

}
