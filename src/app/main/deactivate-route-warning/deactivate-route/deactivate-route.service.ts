import {Injectable} from '@angular/core';
import {ModalComponent} from "../../helpers/modal/modal.component";

@Injectable({
  providedIn: 'root'
})
export class DeactivateRouteService {

  public resolve?: (value: (boolean | PromiseLike<boolean>)) => void
  public reject?: (reason?: any) => void
  public modalVisible: boolean = false;
  modalInstance?: ModalComponent;


  public async showComfirmationModal() {
    return new Promise<boolean>((resolve, reject) => {
      this.reject = reject
      this.resolve = resolve
      this.modalInstance?.open()
    });
  }

}
