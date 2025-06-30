import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response/responseModel';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { DepartmentDescription } from '../models/component/departmentDescription';
import { DepartmentDescriptionDTO } from '../models/dto/departmentDescriptionDTO';

@Injectable({
  providedIn: 'root',
})
export class DepartmentDescriptionService {
  newUrlPath: string = ApiUrl + 'DepartmentDescriptions/';

  constructor(private httpClient: HttpClient) {}

  add(departmentDescription: DepartmentDescription): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      departmentDescription
    );
  }

  update(
    departmentDescription: DepartmentDescription
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      departmentDescription
    );
  }

  delete(
    departmentDescription: DepartmentDescription
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      departmentDescription
    );
  }

  terminate(
    departmentDescription: DepartmentDescription
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      departmentDescription
    );
  }

  getAll(): Observable<ListResponseModel<DepartmentDescription>> {
    let path = this.newUrlPath + 'getall';
    return this.httpClient.get<ListResponseModel<DepartmentDescription>>(path);
  }

  getDeletedAll(): Observable<ListResponseModel<DepartmentDescription>> {
    let path = this.newUrlPath + 'getdeletedall';
    return this.httpClient.get<ListResponseModel<DepartmentDescription>>(path);
  }

  getById(id: string): Observable<SingleResponseModel<DepartmentDescription>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<DepartmentDescription>>(
      path
    );
  }

  getAllDTO(): Observable<ListResponseModel<DepartmentDescriptionDTO>> {
    let path = this.newUrlPath + 'getalldto';
    return this.httpClient.get<ListResponseModel<DepartmentDescriptionDTO>>(
      path
    );
  }

  getDeletedAllDTO(): Observable<ListResponseModel<DepartmentDescriptionDTO>> {
    let path = this.newUrlPath + 'getdeletedalldto';
    return this.httpClient.get<ListResponseModel<DepartmentDescriptionDTO>>(
      path
    );
  }
}
