import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyUserCode } from '../models/concrete/userCodes';
import { LocalStorageService } from '../services/helperServices/localStorage.service';

@Injectable({
  providedIn: 'root',
})
export class MainGuard implements CanActivate {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean {
    const code = this.localStorageService.getFromLocalStorage('code');

    if (code == CompanyUserCode) {
      this.router.navigate(['/dashboard/companyusermain']);
    } else {
      this.router.navigate(['/dashboard/personelusermain']);
    }
    return true;
  }
}
