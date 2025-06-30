import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';
import { HttpClient } from '@angular/common/http';
import { CompanyUser } from '../models/component/companyUser';
import { ResponseModel } from '../models/response/responseModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { CompanyUserDTO } from '../models/dto/companyUserDTO';
import { AdminModel } from '../models/auth/adminModel';

@Injectable({
  providedIn: 'root',
})
export class CompanyUserService {
  newUrlPath: string = ApiUrl + 'CompanyUsers/';

  constructor(private httpClient: HttpClient) {}

  add(companyUser: CompanyUser): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      companyUser
    );
  }

  update(companyUser: CompanyUser): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      companyUser
    );
  }

  delete(companyUser: CompanyUser): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      companyUser
    );
  }

  terminate(companyUser: CompanyUser): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      companyUser
    );
  }

  getAll(adminModel: AdminModel): Observable<ListResponseModel<CompanyUser>> {
    return this.httpClient.post<ListResponseModel<CompanyUser>>(
      this.newUrlPath + 'getall',
      adminModel
    );
  }

  getDeletedAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<CompanyUser>> {
    return this.httpClient.post<ListResponseModel<CompanyUser>>(
      this.newUrlPath + 'getdeletedall',
      adminModel
    );
  }

  getById(
    adminModel: AdminModel
  ): Observable<SingleResponseModel<CompanyUserDTO>> {
    return this.httpClient.post<SingleResponseModel<CompanyUserDTO>>(
      this.newUrlPath + 'getbyid',
      adminModel
    );
  }

  getAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<CompanyUserDTO>> {
    return this.httpClient.post<ListResponseModel<CompanyUserDTO>>(
      this.newUrlPath + 'getalldto',
      adminModel
    );
  }

  getDeletedAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<CompanyUserDTO>> {
    return this.httpClient.post<ListResponseModel<CompanyUserDTO>>(
      this.newUrlPath + 'getdeletedalldto',
      adminModel
    );
  }
}
