import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient } from '@angular/common/http';
import { CompanyUserDepartment } from '../models/companyUserDepartment';
import { ResponseModel } from '../models/responseModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { CompanyUserDepartmentDTO } from '../models/companyUserDepartmentDTO';

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

  getAll(id: number): Observable<ListResponseModel<CompanyUserDepartment>> {
    let path = this.newUrlPath + 'getall?id=' + id;
    return this.httpClient.get<ListResponseModel<CompanyUserDepartment>>(path);
  }

  getDeletedAll(): Observable<ListResponseModel<CompanyUserDepartment>> {
    let path = this.newUrlPath + 'getdeletedall';
    return this.httpClient.get<ListResponseModel<CompanyUserDepartment>>(path);
  }

  getById(id: number): Observable<SingleResponseModel<CompanyUserDepartment>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<CompanyUserDepartment>>(
      path
    );
  }

  getAllDTO(
    id: number
  ): Observable<ListResponseModel<CompanyUserDepartmentDTO>> {
    let path = this.newUrlPath + 'getalldto?id=' + id;
    return this.httpClient.get<ListResponseModel<CompanyUserDepartmentDTO>>(
      path
    );
  }

  getAllDeletedDTO(
    id: number
  ): Observable<ListResponseModel<CompanyUserDepartmentDTO>> {
    let path = this.newUrlPath + 'getalldeleteddto?id=' + id;
    return this.httpClient.get<ListResponseModel<CompanyUserDepartmentDTO>>(
      path
    );
  }
}
