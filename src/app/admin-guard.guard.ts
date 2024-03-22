import { CanActivateFn } from '@angular/router';
import {inject} from '@angular/core';

import {UserService} from "./main/services/user.service";


export const adminGuardGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService)
  return !!userService.user?.isAdmin;
};

