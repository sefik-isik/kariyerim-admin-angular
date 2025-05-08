import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { PersonelUser } from '../models/personelUser';
import { PersonelUserDTO } from '../models/personelUserDTO';
import { AdminModel } from '../models/adminModel';

@Injectable({
  providedIn: 'root',
})
export class PersonelUserService {
  newUrlPath: string = ApiUrl + 'PersonelUsers/';

  constructor(private httpClient: HttpClient) {}

  add(personelUser: PersonelUser): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      personelUser
    );
  }

  update(personelUser: PersonelUser): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      personelUser
    );
  }

  delete(personelUser: PersonelUser): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      personelUser
    );
  }

  getAll(adminModel: AdminModel): Observable<ListResponseModel<PersonelUser>> {
    return this.httpClient.post<ListResponseModel<PersonelUser>>(
      this.newUrlPath + 'getall',
      adminModel
    );
  }

  getDeletedAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUser>> {
    return this.httpClient.post<ListResponseModel<PersonelUser>>(
      this.newUrlPath + 'getdeletedall',
      adminModel
    );
  }

  getById(id: number): Observable<SingleResponseModel<PersonelUser>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<PersonelUser>>(path);
  }

  getAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserDTO>> {
    return this.httpClient.post<ListResponseModel<PersonelUserDTO>>(
      this.newUrlPath + 'getalldto',
      adminModel
    );
  }

  getAllDeletedDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserDTO>> {
    return this.httpClient.post<ListResponseModel<PersonelUserDTO>>(
      this.newUrlPath + 'getalldeleteddto',
      adminModel
    );
  }
}
