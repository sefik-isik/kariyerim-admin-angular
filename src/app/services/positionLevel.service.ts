import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/response/responseModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/response/listResponseModel';
import { Position } from '../models/component/position';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { PositionLevel } from '../models/component/positionLevel';

@Injectable({
  providedIn: 'root',
})
export class PositionLevelService {
  newUrlPath: string = ApiUrl + 'PositionLevels/';

  constructor(private httpClient: HttpClient) {}

  add(positionLevel: PositionLevel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      positionLevel
    );
  }

  update(positionLevel: PositionLevel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      positionLevel
    );
  }

  delete(positionLevel: PositionLevel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      positionLevel
    );
  }

  terminate(positionLevel: PositionLevel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      positionLevel
    );
  }

  getAll(): Observable<ListResponseModel<PositionLevel>> {
    let path = this.newUrlPath + 'getall';
    return this.httpClient.get<ListResponseModel<PositionLevel>>(path);
  }

  getDeletedAll(): Observable<ListResponseModel<PositionLevel>> {
    let path = this.newUrlPath + 'getdeletedall';
    return this.httpClient.get<ListResponseModel<PositionLevel>>(path);
  }

  getById(id: string): Observable<SingleResponseModel<PositionLevel>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<PositionLevel>>(path);
  }
}
