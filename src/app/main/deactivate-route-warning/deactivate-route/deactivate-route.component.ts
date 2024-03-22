import {Component, ViewChild} from '@angular/core';
import {DeactivateRouteService} from "./deactivate-route.service";
import {ModalComponent} from "../../helpers/modal/modal.component";

@Component({
  selector: 'app-deactivate-route',
  templateUrl: './deactivate-route.component.html',
  styleUrl: './deactivate-route.component.scss'
})
export class DeactivateRouteComponent {
  @ViewChild('modalRef')
  set exposeModalInstance(modal: ModalComponent) {
    this.deactivateRouteService.modalInstance = modal
  }

  constructor(public deactivateRouteService: DeactivateRouteService) {
  }
}
