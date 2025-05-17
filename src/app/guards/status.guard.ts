import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class StatusGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean {
    if (this.authService.isAdmin('status')) {
      return true;
    } else {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return false;
    }
  }
}
