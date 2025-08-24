import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResponseModel } from '../models/response/responseModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/response/listResponseModel';
import { Position } from '../models/component/position';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { PageModel } from '../models/base/pageModel';
import { PositionByPageDTO } from '../models/pageModel/positionByPageDTO';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  newUrlPath: string = ApiUrl + 'Positions/';

  constructor(private httpClient: HttpClient) {}

  add(position: Position): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      position
    );
  }

  update(position: Position): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      position
    );
  }

  delete(position: Position): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      position
    );
  }

  terminate(position: Position): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      position
    );
  }

  getAll(): Observable<ListResponseModel<Position>> {
    let path = this.newUrlPath + 'getall';
    return this.httpClient.get<ListResponseModel<Position>>(path);
  }

  getAllByPage(
    pageModel: PageModel
  ): Observable<SingleResponseModel<PositionByPageDTO>> {
    return this.httpClient.post<SingleResponseModel<PositionByPageDTO>>(
      this.newUrlPath + 'getallbypage',
      pageModel
    );
  }

  getDeletedAll(): Observable<ListResponseModel<Position>> {
    let path = this.newUrlPath + 'getdeletedall';
    return this.httpClient.get<ListResponseModel<Position>>(path);
  }

  getById(id: string): Observable<SingleResponseModel<Position>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<Position>>(path);
  }
}
