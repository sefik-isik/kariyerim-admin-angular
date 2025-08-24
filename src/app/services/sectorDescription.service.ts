import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response/responseModel';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { SectorDescription } from '../models/component/sectorDescription';
import { SectorDescriptionDTO } from '../models/dto/sectorDescriptionDTO';

@Injectable({
  providedIn: 'root',
})
export class SectorDescriptionService {
  newUrlPath: string = ApiUrl + 'SectorDescriptions/';

  constructor(private httpClient: HttpClient) {}

  add(sectorDescription: SectorDescription): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      sectorDescription
    );
  }

  update(sectorDescription: SectorDescription): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      sectorDescription
    );
  }

  delete(sectorDescription: SectorDescription): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      sectorDescription
    );
  }

  terminate(sectorDescription: SectorDescription): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      sectorDescription
    );
  }

  getAll(): Observable<ListResponseModel<SectorDescription>> {
    let path = this.newUrlPath + 'getall';
    return this.httpClient.get<ListResponseModel<SectorDescription>>(path);
  }

  getDeletedAll(): Observable<ListResponseModel<SectorDescription>> {
    let path = this.newUrlPath + 'getdeletedall';
    return this.httpClient.get<ListResponseModel<SectorDescription>>(path);
  }

  getById(id: string): Observable<SingleResponseModel<SectorDescription>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<SectorDescription>>(path);
  }

  getAllDTO(): Observable<ListResponseModel<SectorDescriptionDTO>> {
    let path = this.newUrlPath + 'getalldto';
    return this.httpClient.get<ListResponseModel<SectorDescriptionDTO>>(path);
  }

  getDeletedAllDTO(): Observable<ListResponseModel<SectorDescriptionDTO>> {
    let path = this.newUrlPath + 'getdeletedalldto';
    return this.httpClient.get<ListResponseModel<SectorDescriptionDTO>>(path);
  }
}
