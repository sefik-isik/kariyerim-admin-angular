import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyUserDepartment } from '../models/component/companyUserDepartment';
import { ApiUrl } from '../models/concrete/apiUrl';
import { ListResponseModel } from '../models/response/listResponseModel';
import { ResponseModel } from '../models/response/responseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';

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

  getAll(): Observable<ListResponseModel<CompanyUserDepartment>> {
    let path = this.newUrlPath + 'getall';
    return this.httpClient.get<ListResponseModel<CompanyUserDepartment>>(path);
  }

  getDeletedAll(): Observable<ListResponseModel<CompanyUserDepartment>> {
    let path = this.newUrlPath + 'getdeletedall';
    return this.httpClient.get<ListResponseModel<CompanyUserDepartment>>(path);
  }

  getById(id: string): Observable<SingleResponseModel<CompanyUserDepartment>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<CompanyUserDepartment>>(
      path
    );
  }
}
