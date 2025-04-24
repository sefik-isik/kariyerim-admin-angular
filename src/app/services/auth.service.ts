import { LocalStorageService } from './localStorage.service';
import { Injectable, OnInit } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { Status } from '../models/status';
import { HttpClient } from '@angular/common/http';
import { SingleResponseModel } from '../models/singleResponseModel';
import { LoginModel } from '../models/loginModel';
import { TokenModel } from '../models/tokenModel';
import { RegisterModel } from '../models/registerModel';
import { PasswordModel } from '../models/passwordModel';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  newUrlPath: string = ApiUrl + 'UserAuth/';

  constructor(
    private HttpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit() {}

  login(loginModel: LoginModel) {
    return this.HttpClient.post<SingleResponseModel<TokenModel>>(
      this.newUrlPath + 'login',
      loginModel
    );
  }

  register(registerModel: RegisterModel) {
    return this.HttpClient.post<SingleResponseModel<TokenModel>>(
      this.newUrlPath + 'register',
      registerModel
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
    if (this.localStorageService.getFromLocalStorage(key) == Status) {
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
