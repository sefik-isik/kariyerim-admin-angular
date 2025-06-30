import { Observable, of } from 'rxjs';
import { AdminModel } from '../../models/auth/adminModel';
import { LocalStorageService } from './localStorage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private localStorageService: LocalStorageService) {}

  getAdminValues(id: string): Observable<AdminModel> {
    const adminModel = {
      id: id,
      userId: this.localStorageService.getFromLocalStorage('id'),
      email: this.localStorageService.getFromLocalStorage('email'),
      status: this.localStorageService.getFromLocalStorage('status'),
      code: this.localStorageService.getFromLocalStorage('code'),
    };
    return of(adminModel);
  }
}
