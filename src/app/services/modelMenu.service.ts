import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ModelMenu } from '../models/modelMenu';
import { SingleResponseModel } from '../models/singleResponseModel';

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

  getAll(): Observable<ListResponseModel<ModelMenu>> {
    let path = this.newUrlPath + 'getall';
    return this.httpClient.get<ListResponseModel<ModelMenu>>(path);
  }

  getById(id: number): Observable<SingleResponseModel<ModelMenu>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<ModelMenu>>(path);
  }
}
