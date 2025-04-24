import { CompanyUserDTO } from '../models/companyUserDTO';
import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient } from '@angular/common/http';
import { CompanyUser } from '../models/companyUser';
import { ResponseModel } from '../models/responseModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

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

  getAll(id: number): Observable<ListResponseModel<CompanyUser>> {
    let path = this.newUrlPath + 'getall?id=' + id;
    return this.httpClient.get<ListResponseModel<CompanyUser>>(path);
  }

  getById(id: number): Observable<SingleResponseModel<CompanyUserDTO>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<CompanyUserDTO>>(path);
  }

  getAllDTO(id: number): Observable<ListResponseModel<CompanyUserDTO>> {
    let path = this.newUrlPath + 'getalldto?id=' + id;
    return this.httpClient.get<ListResponseModel<CompanyUserDTO>>(path);
  }
}
