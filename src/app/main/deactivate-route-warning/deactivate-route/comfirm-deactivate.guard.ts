import {CanActivateFn, CanDeactivateFn} from '@angular/router';
import {inject} from '@angular/core';
import {DeactivateRouteService} from "./deactivate-route.service";


export const confirmDeactivateGuard: CanDeactivateFn<any> = (route, state) => {
  const deactivateRouteService = inject(DeactivateRouteService)
  return deactivateRouteService.showComfirmationModal();
};

