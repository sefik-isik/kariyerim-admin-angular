import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response/responseModel';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { Department } from '../models/component/department';

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

  terminate(department: Department): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
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

  getById(id: string): Observable<SingleResponseModel<Department>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<Department>>(path);
  }
}
