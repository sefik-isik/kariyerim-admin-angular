import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response/responseModel';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { PositionDescription } from '../models/component/positionDescription';
import { PositionDescriptionDTO } from '../models/dto/positionDescriptionDTO';

@Injectable({
  providedIn: 'root',
})
export class PositionDescriptionService {
  newUrlPath: string = ApiUrl + 'PositionDescriptions/';

  constructor(private httpClient: HttpClient) {}

  add(positionDescription: PositionDescription): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      positionDescription
    );
  }

  update(positionDescription: PositionDescription): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      positionDescription
    );
  }

  delete(positionDescription: PositionDescription): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      positionDescription
    );
  }

  terminate(
    positionDescription: PositionDescription
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      positionDescription
    );
  }

  getAll(): Observable<ListResponseModel<PositionDescription>> {
    let path = this.newUrlPath + 'getall';
    return this.httpClient.get<ListResponseModel<PositionDescription>>(path);
  }

  getDeletedAll(): Observable<ListResponseModel<PositionDescription>> {
    let path = this.newUrlPath + 'getdeletedall';
    return this.httpClient.get<ListResponseModel<PositionDescription>>(path);
  }

  getById(id: string): Observable<SingleResponseModel<PositionDescription>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<PositionDescription>>(path);
  }

  getAllDTO(): Observable<ListResponseModel<PositionDescriptionDTO>> {
    let path = this.newUrlPath + 'getalldto';
    return this.httpClient.get<ListResponseModel<PositionDescriptionDTO>>(path);
  }

  getDeletedAllDTO(): Observable<ListResponseModel<PositionDescriptionDTO>> {
    let path = this.newUrlPath + 'getdeletedalldto';
    return this.httpClient.get<ListResponseModel<PositionDescriptionDTO>>(path);
  }
}
