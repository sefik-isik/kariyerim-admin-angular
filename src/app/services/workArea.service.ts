import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response/responseModel';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { WorkArea } from '../models/component/workArea';

@Injectable({
  providedIn: 'root',
})
export class WorkAreaService {
  newUrlPath: string = ApiUrl + 'WorkAreas/';

  constructor(private httpClient: HttpClient) {}

  add(workArea: WorkArea): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      workArea
    );
  }

  update(workArea: WorkArea): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      workArea
    );
  }

  delete(workArea: WorkArea): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      workArea
    );
  }

  terminate(workArea: WorkArea): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      workArea
    );
  }

  getAll(): Observable<ListResponseModel<WorkArea>> {
    let path = this.newUrlPath + 'getall';
    return this.httpClient.get<ListResponseModel<WorkArea>>(path);
  }

  getDeletedAll(): Observable<ListResponseModel<WorkArea>> {
    let path = this.newUrlPath + 'getdeletedall';
    return this.httpClient.get<ListResponseModel<WorkArea>>(path);
  }

  getById(id: string): Observable<SingleResponseModel<WorkArea>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<WorkArea>>(path);
  }
}
