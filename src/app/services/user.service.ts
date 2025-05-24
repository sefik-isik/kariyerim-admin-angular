import { ApiUrl } from './../models/apiUrl';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { UserDTO } from '../models/userDTO';
import { UserCodeModel } from '../models/userCodeModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { AdminModel } from '../models/adminModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  newUrlPath: string = ApiUrl + 'Users/';

  constructor(private httpClient: HttpClient) {}
  update(user: UserDTO): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      user
    );
  }

  delete(user: UserDTO): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      user
    );
  }

  getById(adminModel: AdminModel): Observable<SingleResponseModel<UserDTO>> {
    return this.httpClient.post<SingleResponseModel<UserDTO>>(
      this.newUrlPath + 'getbyiddto',
      adminModel
    );
  }

  getCode(
    adminModel: AdminModel
  ): Observable<ListResponseModel<UserCodeModel>> {
    return this.httpClient.post<ListResponseModel<UserCodeModel>>(
      this.newUrlPath + 'getcode',
      adminModel
    );
  }

  getAllDTO(adminModel: AdminModel): Observable<ListResponseModel<UserDTO>> {
    return this.httpClient.post<ListResponseModel<UserDTO>>(
      this.newUrlPath + 'getalldto',
      adminModel
    );
  }

  getAllCompanyUserDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<UserDTO>> {
    return this.httpClient.post<ListResponseModel<UserDTO>>(
      this.newUrlPath + 'getallcompanyuserdto',
      adminModel
    );
  }

  getAllPersonelUserDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<UserDTO>> {
    return this.httpClient.post<ListResponseModel<UserDTO>>(
      this.newUrlPath + 'getallpersoneluserdto',
      adminModel
    );
  }

  getDeletedAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<UserDTO>> {
    return this.httpClient.post<ListResponseModel<UserDTO>>(
      this.newUrlPath + 'getdeletedalldto',
      adminModel
    );
  }
}
