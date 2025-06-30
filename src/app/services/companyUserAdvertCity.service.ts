import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminModel } from '../models/auth/adminModel';
import { CompanyUserAdvertCity } from '../models/component/companyUserAdvertCity';
import { ApiUrl } from '../models/concrete/apiUrl';
import { CompanyUserAdvertCityDTO } from '../models/dto/companyUserAdvertCityDTO';
import { ListResponseModel } from '../models/response/listResponseModel';
import { ResponseModel } from '../models/response/responseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CompanyUserAdvertCityService {
  newUrlPath: string = ApiUrl + 'CompanyUserAdvertCities/';

  constructor(private httpClient: HttpClient) {}

  add(companyUserAdvertCity: CompanyUserAdvertCity): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      companyUserAdvertCity
    );
  }

  update(
    companyUserAdvertCity: CompanyUserAdvertCity
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      companyUserAdvertCity
    );
  }

  delete(
    companyUserAdvertCity: CompanyUserAdvertCity
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      companyUserAdvertCity
    );
  }

  terminate(
    companyUserAdvertCity: CompanyUserAdvertCity
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      companyUserAdvertCity
    );
  }

  getAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<CompanyUserAdvertCity>> {
    return this.httpClient.post<ListResponseModel<CompanyUserAdvertCity>>(
      this.newUrlPath + 'getall',
      adminModel
    );
  }

  getDeletedAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<CompanyUserAdvertCity>> {
    return this.httpClient.post<ListResponseModel<CompanyUserAdvertCity>>(
      this.newUrlPath + 'getdeletedall',
      adminModel
    );
  }

  getById(
    adminModel: AdminModel
  ): Observable<SingleResponseModel<CompanyUserAdvertCity>> {
    return this.httpClient.post<SingleResponseModel<CompanyUserAdvertCity>>(
      this.newUrlPath + 'getbyid',
      adminModel
    );
  }

  getAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<CompanyUserAdvertCityDTO>> {
    return this.httpClient.post<ListResponseModel<CompanyUserAdvertCityDTO>>(
      this.newUrlPath + 'getalldto',
      adminModel
    );
  }

  getDeletedAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<CompanyUserAdvertCityDTO>> {
    return this.httpClient.post<ListResponseModel<CompanyUserAdvertCityDTO>>(
      this.newUrlPath + 'getdeletedalldto',
      adminModel
    );
  }
}
