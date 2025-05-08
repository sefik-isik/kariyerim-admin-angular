import { Observable, of } from 'rxjs';
import { AdminModel } from '../models/adminModel';
import { LocalStorageService } from './localStorage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private localStorageService: LocalStorageService) {}

  getAdminValues(): Observable<AdminModel> {
    const adminModel = {
      userId: parseInt(this.localStorageService.getFromLocalStorage('id')),
      email: this.localStorageService.getFromLocalStorage('email'),
      status: this.localStorageService.getFromLocalStorage('status'),
    };
    return of(adminModel);
  }
}
