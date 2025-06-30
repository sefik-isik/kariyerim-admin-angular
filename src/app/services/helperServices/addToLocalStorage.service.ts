import { Injectable } from '@angular/core';
import { LocalStorageService } from './localStorage.service';

@Injectable({
  providedIn: 'root',
})
export class AddToLocalStorageService {
  constructor(private localStorageService: LocalStorageService) {}
  addToken(token: string) {
    if (token) {
      this.localStorageService.setToLocalStorage('token', token);
    }
  }

  addId(id: string) {
    if (id) {
      this.localStorageService.setToLocalStorage('id', id);
    }
  }

  addFirstName(firstName: string) {
    if (firstName) {
      this.localStorageService.setToLocalStorage('firstName', firstName);
    }
  }

  addLasttName(lastName: string) {
    if (lastName) {
      this.localStorageService.setToLocalStorage('lastName', lastName);
    }
  }

  addEmail(email: string) {
    if (email) {
      this.localStorageService.setToLocalStorage('email', email);
    }
  }

  addPhone(phoneNumber: string) {
    if (phoneNumber) {
      this.localStorageService.setToLocalStorage('phoneNumber', phoneNumber);
    }
  }
  addStatus(status: string) {
    if (status) {
      this.localStorageService.setToLocalStorage('status', status);
    }
  }
  addCode(code: string) {
    if (code) {
      this.localStorageService.setToLocalStorage('code', code);
    }
  }
  addCreateDate(createdDate: string) {
    if (createdDate) {
      this.localStorageService.setToLocalStorage('createdDate', createdDate);
    }
  }
  addUpdateDate(updatedDate: string) {
    if (updatedDate) {
      this.localStorageService.setToLocalStorage('updatedDate', updatedDate);
    }
  }
  addDeletedDate(deletedDate: string) {
    if (deletedDate) {
      this.localStorageService.setToLocalStorage('deletedDate', deletedDate);
    }
  }

  addExpiration(expiration: string) {
    if (expiration) {
      this.localStorageService.setToLocalStorage('expiration', expiration);
    }
  }
}
