import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response/responseModel';
import { ListResponseModel } from '../models/response/listResponseModel';
import { ModelMenu } from '../models/component/modelMenu';
import { SingleResponseModel } from '../models/response/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class ModelMenuService {
  newUrlPath: string = ApiUrl + 'ModelMenus/';

  constructor(private httpClient: HttpClient) {}

  add(modelMenu: ModelMenu): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      modelMenu
    );
  }

  update(modelMenu: ModelMenu): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      modelMenu
    );
  }

  delete(modelMenu: ModelMenu): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      modelMenu
    );
  }

  terminate(modelMenu: ModelMenu): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      modelMenu
    );
  }

  getAll(): Observable<ListResponseModel<ModelMenu>> {
    let path = this.newUrlPath + 'getall';
    return this.httpClient.get<ListResponseModel<ModelMenu>>(path);
  }

  getDeletedAll(): Observable<ListResponseModel<ModelMenu>> {
    let path = this.newUrlPath + 'getdeletedall';
    return this.httpClient.get<ListResponseModel<ModelMenu>>(path);
  }

  getById(id: string): Observable<SingleResponseModel<ModelMenu>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<ModelMenu>>(path);
  }
}
