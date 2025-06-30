import { LocalStorageService } from './helperServices/localStorage.service';
import { Injectable, OnInit } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';

import { HttpClient } from '@angular/common/http';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { LoginModel } from '../models/auth/loginModel';
import { TokenModel } from '../models/auth/tokenModel';
import { RegisterModel } from '../models/auth/registerModel';
import { PasswordModel } from '../models/auth/passwordModel';
import { Router } from '@angular/router';
import { UserDTO } from '../models/dto/userDTO';
import { AdminStatus } from '../models/concrete/status';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  newUrlPath: string = ApiUrl + 'Auths/';

  constructor(
    private HttpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit() {}

  register(registerModel: RegisterModel) {
    return this.HttpClient.post<SingleResponseModel<TokenModel>>(
      this.newUrlPath + 'register',
      registerModel
    );
  }

  login(loginModel: LoginModel) {
    return this.HttpClient.post<SingleResponseModel<TokenModel>>(
      this.newUrlPath + 'login',
      loginModel
    );
  }

  updatePassword(passwordModel: PasswordModel) {
    return this.HttpClient.post<SingleResponseModel<PasswordModel>>(
      this.newUrlPath + 'updatepassword',
      passwordModel
    );
  }

  isAuthenticated(key: string): boolean {
    const token = this.localStorageService.getFromLocalStorage(key);

    if (token) {
      return true;
    } else {
      return false;
    }
  }

  checkTokenExpiration(key: string): boolean {
    const expirationTime = this.localStorageService.getFromLocalStorage(key);

    let thisTime = new Date();
    thisTime.setHours(thisTime.getHours() + 3);

    if (expirationTime < thisTime.toJSON()) {
      if (this.localStorageService.clearLocalStorage()) {
        return true;
      }
    }
    return false;
  }

  isAdmin(key: string) {
    if (this.localStorageService.getFromLocalStorage(key) == AdminStatus) {
      return true;
    }
    return false;
  }

  logout() {
    this.localStorageService.clearLocalStorage();
    this.router.navigate(['login']);
    window.location.reload();
  }
}
