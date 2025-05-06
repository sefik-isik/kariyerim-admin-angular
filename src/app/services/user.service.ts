import { ApiUrl } from './../models/apiUrl';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { UserDTO } from '../models/userDTO';
import { UserCodeModel } from '../models/userCodeModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

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

  getById(id: number): Observable<SingleResponseModel<UserDTO>> {
    let path = this.newUrlPath + 'getbyiddto?id=' + id;
    return this.httpClient.get<SingleResponseModel<UserDTO>>(path);
  }

  getCode(id: number): Observable<ListResponseModel<UserCodeModel>> {
    let path = this.newUrlPath + 'getcode?userId=' + id;
    return this.httpClient.get<ListResponseModel<UserCodeModel>>(path);
  }

  getAllDTO(id: number): Observable<ListResponseModel<UserDTO>> {
    let path = this.newUrlPath + 'getalldto?id=' + id;
    return this.httpClient.get<ListResponseModel<UserDTO>>(path);
  }

  getAllDeletedDTO(id: number): Observable<ListResponseModel<UserDTO>> {
    let path = this.newUrlPath + 'getalldeleteddto?id=' + id;
    return this.httpClient.get<ListResponseModel<UserDTO>>(path);
  }
}
