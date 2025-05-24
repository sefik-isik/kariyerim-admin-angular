import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  newUrlPath: string = ApiUrl + 'Departments/';

  constructor(private httpClient: HttpClient) {}

  add(department: Department): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      department
    );
  }

  update(department: Department): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      department
    );
  }

  delete(department: Department): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      department
    );
  }

  getAll(): Observable<ListResponseModel<Department>> {
    let path = this.newUrlPath + 'getall';
    return this.httpClient.get<ListResponseModel<Department>>(path);
  }

  getDeletedAll(): Observable<ListResponseModel<Department>> {
    let path = this.newUrlPath + 'getdeletedall';
    return this.httpClient.get<ListResponseModel<Department>>(path);
  }

  getById(id: number): Observable<SingleResponseModel<Department>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<Department>>(path);
  }
}
