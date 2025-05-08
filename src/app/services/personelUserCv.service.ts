import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { PersonelUserCv } from '../models/personelUserCv';
import { PersonelUserCvDTO } from '../models/personelUserCvDTO';
import { AdminModel } from '../models/adminModel';

@Injectable({
  providedIn: 'root',
})
export class PersonelUserCvService {
  newUrlPath: string = ApiUrl + 'PersonelUserCvs/';

  constructor(private httpClient: HttpClient) {}

  add(personelUserCv: PersonelUserCv): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      personelUserCv
    );
  }

  update(personelUserCv: PersonelUserCv): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      personelUserCv
    );
  }

  delete(personelUserCv: PersonelUserCv): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      personelUserCv
    );
  }

  getAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserCv>> {
    return this.httpClient.post<ListResponseModel<PersonelUserCv>>(
      this.newUrlPath + 'getall',
      adminModel
    );
  }

  getDeletedAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserCv>> {
    return this.httpClient.post<ListResponseModel<PersonelUserCv>>(
      this.newUrlPath + 'getdeletedall',
      adminModel
    );
  }

  getById(id: number): Observable<SingleResponseModel<PersonelUserCv>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<PersonelUserCv>>(path);
  }

  getAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserCvDTO>> {
    return this.httpClient.post<ListResponseModel<PersonelUserCvDTO>>(
      this.newUrlPath + 'getalldto',
      adminModel
    );
  }

  getAllDeletedDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserCvDTO>> {
    return this.httpClient.post<ListResponseModel<PersonelUserCvDTO>>(
      this.newUrlPath + 'getalldeleteddto',
      adminModel
    );
  }
}
