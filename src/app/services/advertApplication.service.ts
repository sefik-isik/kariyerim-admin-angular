import { ApiUrl } from '../models/concrete/apiUrl';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { ResponseModel } from '../models/response/responseModel';
import { AdminModel } from '../models/auth/adminModel';
import { AdvertApplication } from '../models/component/advertApplication';

@Injectable({
  providedIn: 'root',
})
export class AdvertApplicationService {
  newUrlPath: string = ApiUrl + 'AdvertApplications/';

  constructor(private httpClient: HttpClient) {}

  add(advertApplication: AdvertApplication): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      advertApplication
    );
  }

  terminate(advertApplication: AdvertApplication): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      advertApplication
    );
  }

  getAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<AdvertApplication>> {
    return this.httpClient.post<ListResponseModel<AdvertApplication>>(
      this.newUrlPath + 'getall',
      adminModel
    );
  }

  getById(id: string): Observable<SingleResponseModel<AdvertApplication>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<AdvertApplication>>(path);
  }

  getAllByCompanyId(
    id: string
  ): Observable<SingleResponseModel<AdvertApplication>> {
    let path = this.newUrlPath + 'getallbycompanyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<AdvertApplication>>(path);
  }

  getAllByPersonelId(
    id: string
  ): Observable<SingleResponseModel<AdvertApplication>> {
    let path = this.newUrlPath + 'getallbypersonelid?id=' + id;
    return this.httpClient.get<SingleResponseModel<AdvertApplication>>(path);
  }

  getAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<AdvertApplication>> {
    return this.httpClient.post<ListResponseModel<AdvertApplication>>(
      this.newUrlPath + 'getalldto',
      adminModel
    );
  }

  getAllByCompanyIdDTO(
    id: string
  ): Observable<SingleResponseModel<AdvertApplication>> {
    let path = this.newUrlPath + 'getallbycompanyiddto?id=' + id;
    return this.httpClient.get<SingleResponseModel<AdvertApplication>>(path);
  }

  getAllByPersonelIdDTO(
    id: string
  ): Observable<SingleResponseModel<AdvertApplication>> {
    let path = this.newUrlPath + 'getallbypersoneliddto?id=' + id;
    return this.httpClient.get<SingleResponseModel<AdvertApplication>>(path);
  }
}
