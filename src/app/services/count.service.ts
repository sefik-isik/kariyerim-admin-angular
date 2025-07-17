import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response/responseModel';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { Count } from '../models/component/count';

@Injectable({
  providedIn: 'root',
})
export class CountService {
  newUrlPath: string = ApiUrl + 'Counts/';

  constructor(private httpClient: HttpClient) {}

  add(count: Count): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.newUrlPath + 'add', count);
  }

  update(count: Count): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      count
    );
  }

  delete(count: Count): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      count
    );
  }

  terminate(count: Count): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      count
    );
  }

  getAll(): Observable<ListResponseModel<Count>> {
    let path = this.newUrlPath + 'getall';
    return this.httpClient.get<ListResponseModel<Count>>(path);
  }

  getDeletedAll(): Observable<ListResponseModel<Count>> {
    let path = this.newUrlPath + 'getdeletedall';
    return this.httpClient.get<ListResponseModel<Count>>(path);
  }

  getById(id: string): Observable<SingleResponseModel<Count>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<Count>>(path);
  }
}
