import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient } from '@angular/common/http';
import { CompanyUser } from '../models/companyUser';
import { ResponseModel } from '../models/responseModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { CompanyUserDTO } from '../models/companyUserDTO';
import { AdminModel } from '../models/adminModel';

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
