import {Directive, EventEmitter, Input, OnChanges, Output, SimpleChanges} from "@angular/core";

@Directive({
  selector: '[appWatchObject]'
})
export class WatchObjectDirective implements OnChanges {

  @Input('appWatchObject') data: any;
  @Output() dataChange = new EventEmitter<any>();

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'].currentValue !== changes['data'].previousValue) {
      this.dataChange.emit(this.data);
    }
  }

}
