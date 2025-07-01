import { ApiUrl } from '../models/concrete/apiUrl';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { ResponseModel } from '../models/response/responseModel';
import { AdminModel } from '../models/auth/adminModel';
import { PersonelUserAdvertApplication } from '../models/component/personelUserAdvertApplication';

@Injectable({
  providedIn: 'root',
})
export class PersonelUserAdvertApplicationService {
  newUrlPath: string = ApiUrl + 'PersonelUserAdvertApplications/';

  constructor(private httpClient: HttpClient) {}

  add(
    personelUserAdvertApplication: PersonelUserAdvertApplication
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      personelUserAdvertApplication
    );
  }

  terminate(
    personelUserAdvertApplication: PersonelUserAdvertApplication
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      personelUserAdvertApplication
    );
  }

  getAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserAdvertApplication>> {
    return this.httpClient.post<
      ListResponseModel<PersonelUserAdvertApplication>
    >(this.newUrlPath + 'getall', adminModel);
  }

  getById(
    id: string
  ): Observable<SingleResponseModel<PersonelUserAdvertApplication>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<
      SingleResponseModel<PersonelUserAdvertApplication>
    >(path);
  }

  getAllByCompanyId(
    id: string
  ): Observable<SingleResponseModel<PersonelUserAdvertApplication>> {
    let path = this.newUrlPath + 'getallbycompanyid?id=' + id;
    return this.httpClient.get<
      SingleResponseModel<PersonelUserAdvertApplication>
    >(path);
  }

  getAllByPersonelId(
    id: string
  ): Observable<SingleResponseModel<PersonelUserAdvertApplication>> {
    let path = this.newUrlPath + 'getallbypersonelid?id=' + id;
    return this.httpClient.get<
      SingleResponseModel<PersonelUserAdvertApplication>
    >(path);
  }

  getAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserAdvertApplication>> {
    return this.httpClient.post<
      ListResponseModel<PersonelUserAdvertApplication>
    >(this.newUrlPath + 'getalldto', adminModel);
  }

  getAllByCompanyIdDTO(
    id: string
  ): Observable<SingleResponseModel<PersonelUserAdvertApplication>> {
    let path = this.newUrlPath + 'getallbycompanyiddto?id=' + id;
    return this.httpClient.get<
      SingleResponseModel<PersonelUserAdvertApplication>
    >(path);
  }

  getAllByPersonelIdDTO(
    id: string
  ): Observable<SingleResponseModel<PersonelUserAdvertApplication>> {
    let path = this.newUrlPath + 'getallbypersoneliddto?id=' + id;
    return this.httpClient.get<
      SingleResponseModel<PersonelUserAdvertApplication>
    >(path);
  }
}
