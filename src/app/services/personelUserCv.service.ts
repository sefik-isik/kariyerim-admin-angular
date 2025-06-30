import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response/responseModel';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { PersonelUserCv } from '../models/component/personelUserCv';
import { PersonelUserCvDTO } from '../models/dto/personelUserCvDTO';
import { AdminModel } from '../models/auth/adminModel';

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

  terminate(personelUserCv: PersonelUserCv): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      personelUserCv
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

  getById(
    adminModel: AdminModel
  ): Observable<SingleResponseModel<PersonelUserCv>> {
    return this.httpClient.post<SingleResponseModel<PersonelUserCv>>(
      this.newUrlPath + 'getbyid',
      adminModel
    );
  }

  getAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserCvDTO>> {
    return this.httpClient.post<ListResponseModel<PersonelUserCvDTO>>(
      this.newUrlPath + 'getalldto',
      adminModel
    );
  }

  getDeletedAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserCvDTO>> {
    return this.httpClient.post<ListResponseModel<PersonelUserCvDTO>>(
      this.newUrlPath + 'getdeletedalldto',
      adminModel
    );
  }
}
