import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/response/responseModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { AdminModel } from '../models/auth/adminModel';
import { CompanyUserAdvertJobDescription } from '../models/component/companyUserAdvertJobDescription';
import { CompanyUserAdvertJobDescriptionDTO } from '../models/dto/companyUserAdvertJobDescriptionDTO';

@Injectable({
  providedIn: 'root',
})
export class CompanyUserAdvertJobDescriptionService {
  newUrlPath: string = ApiUrl + 'CompanyUserAdvertJobDescriptions/';

  constructor(private httpClient: HttpClient) {}

  add(
    companyUserAdvertJobDescription: CompanyUserAdvertJobDescription
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      companyUserAdvertJobDescription
    );
  }

  update(
    companyUserAdvertJobDescription: CompanyUserAdvertJobDescription
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      companyUserAdvertJobDescription
    );
  }

  delete(
    companyUserAdvertJobDescription: CompanyUserAdvertJobDescription
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      companyUserAdvertJobDescription
    );
  }

  terminate(
    companyUserAdvertJobDescription: CompanyUserAdvertJobDescription
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      companyUserAdvertJobDescription
    );
  }

  getAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<CompanyUserAdvertJobDescription>> {
    return this.httpClient.post<
      ListResponseModel<CompanyUserAdvertJobDescription>
    >(this.newUrlPath + 'getall', adminModel);
  }

  getDeletedAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<CompanyUserAdvertJobDescription>> {
    return this.httpClient.post<
      ListResponseModel<CompanyUserAdvertJobDescription>
    >(this.newUrlPath + 'getdeletedall', adminModel);
  }

  getById(
    adminModel: AdminModel
  ): Observable<SingleResponseModel<CompanyUserAdvertJobDescription>> {
    return this.httpClient.post<
      SingleResponseModel<CompanyUserAdvertJobDescription>
    >(this.newUrlPath + 'getbyid', adminModel);
  }

  getAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<CompanyUserAdvertJobDescriptionDTO>> {
    return this.httpClient.post<
      ListResponseModel<CompanyUserAdvertJobDescriptionDTO>
    >(this.newUrlPath + 'getalldto', adminModel);
  }

  getDeletedAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<CompanyUserAdvertJobDescriptionDTO>> {
    return this.httpClient.post<
      ListResponseModel<CompanyUserAdvertJobDescriptionDTO>
    >(this.newUrlPath + 'getdeletedalldto', adminModel);
  }
}
