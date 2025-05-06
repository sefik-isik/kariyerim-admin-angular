import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { PersonelUser } from '../models/personelUser';
import { PersonelUserDTO } from '../models/personelUserDTO';

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

  getAll(id: number): Observable<ListResponseModel<PersonelUser>> {
    let path = this.newUrlPath + 'getall?id=' + id;
    return this.httpClient.get<ListResponseModel<PersonelUser>>(path);
  }

  getDeletedAll(): Observable<ListResponseModel<PersonelUser>> {
    let path = this.newUrlPath + 'getdeletedall';
    return this.httpClient.get<ListResponseModel<PersonelUser>>(path);
  }

  getById(id: number): Observable<SingleResponseModel<PersonelUser>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<PersonelUser>>(path);
  }

  getAllDTO(id: number): Observable<ListResponseModel<PersonelUserDTO>> {
    let path = this.newUrlPath + 'getalldto?id=' + id;
    return this.httpClient.get<ListResponseModel<PersonelUserDTO>>(path);
  }

  getAllDeletedDTO(id: number): Observable<ListResponseModel<PersonelUserDTO>> {
    let path = this.newUrlPath + 'getalldeleteddto?id=' + id;
    return this.httpClient.get<ListResponseModel<PersonelUserDTO>>(path);
  }
}
