import { CanActivateFn } from '@angular/router';
import {inject} from '@angular/core';

import {UserService} from "./main/services/user.service";
import {filter, firstValueFrom} from "rxjs";


export const adminGuardGuard: CanActivateFn = async (route, state) => {
  const userService = inject(UserService)
  await firstValueFrom(userService.userLoading$.pipe(filter(v=>v)))
  return !!userService.user?.isAdmin;
};

