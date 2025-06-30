import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response/responseModel';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { WorkingMethod } from '../models/component/workingMethod';

@Injectable({
  providedIn: 'root',
})
export class WorkingMethodService {
  newUrlPath: string = ApiUrl + 'WorkingMethods/';

  constructor(private httpClient: HttpClient) {}

  add(workingMethod: WorkingMethod): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      workingMethod
    );
  }

  update(workingMethod: WorkingMethod): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      workingMethod
    );
  }

  delete(workingMethod: WorkingMethod): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      workingMethod
    );
  }

  terminate(workingMethod: WorkingMethod): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      workingMethod
    );
  }

  getAll(): Observable<ListResponseModel<WorkingMethod>> {
    let path = this.newUrlPath + 'getall';
    return this.httpClient.get<ListResponseModel<WorkingMethod>>(path);
  }

  getDeletedAll(): Observable<ListResponseModel<WorkingMethod>> {
    let path = this.newUrlPath + 'getdeletedall';
    return this.httpClient.get<ListResponseModel<WorkingMethod>>(path);
  }

  getById(id: string): Observable<SingleResponseModel<WorkingMethod>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<WorkingMethod>>(path);
  }
}
