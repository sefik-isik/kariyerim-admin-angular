import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PersonelUserCode } from '../models/concrete/userCodes';
import { LocalStorageService } from '../services/helperServices/localStorage.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PersonelUserGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean {
    const code = this.localStorageService.getFromLocalStorage('code');

    if (code == PersonelUserCode || this.authService.isAdmin()) {
      return true;
    } else {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return false;
    }
  }
}
