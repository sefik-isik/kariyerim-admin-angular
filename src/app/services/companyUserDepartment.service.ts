import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';
import { HttpClient } from '@angular/common/http';
import { CompanyUserDepartment } from '../models/component/companyUserDepartment';
import { ResponseModel } from '../models/response/responseModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { CompanyUserDepartmentDTO } from '../models/dto/companyUserDepartmentDTO';
import { AdminModel } from '../models/auth/adminModel';

@Injectable({
  providedIn: 'root',
})
export class CompanyUserDepartmentService {
  newUrlPath: string = ApiUrl + 'CompanyUserDepartments/';

  constructor(private httpClient: HttpClient) {}

  add(companyUserDepartment: CompanyUserDepartment): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      companyUserDepartment
    );
  }

  update(
    companyUserDepartment: CompanyUserDepartment
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      companyUserDepartment
    );
  }

  delete(
    companyUserDepartment: CompanyUserDepartment
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      companyUserDepartment
    );
  }

  terminate(
    companyUserDepartment: CompanyUserDepartment
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      companyUserDepartment
    );
  }

  getAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<CompanyUserDepartment>> {
    return this.httpClient.post<ListResponseModel<CompanyUserDepartment>>(
      this.newUrlPath + 'getall',
      adminModel
    );
  }

  getDeletedAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<CompanyUserDepartment>> {
    return this.httpClient.post<ListResponseModel<CompanyUserDepartment>>(
      this.newUrlPath + 'getdeletedall',
      adminModel
    );
  }

  getById(
    adminModel: AdminModel
  ): Observable<SingleResponseModel<CompanyUserDepartment>> {
    return this.httpClient.post<SingleResponseModel<CompanyUserDepartment>>(
      this.newUrlPath + 'getbyid',
      adminModel
    );
  }

  getAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<CompanyUserDepartmentDTO>> {
    return this.httpClient.post<ListResponseModel<CompanyUserDepartmentDTO>>(
      this.newUrlPath + 'getalldto',
      adminModel
    );
  }

  getDeletedAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<CompanyUserDepartmentDTO>> {
    return this.httpClient.post<ListResponseModel<CompanyUserDepartmentDTO>>(
      this.newUrlPath + 'getdeletedalldto',
      adminModel
    );
  }
}
