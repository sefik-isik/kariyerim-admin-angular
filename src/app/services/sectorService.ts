import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Sector } from '../models/sector';

@Injectable({
  providedIn: 'root',
})
export class SectorService {
  newUrlPath: string = ApiUrl + 'Sectors/';

  constructor(private httpClient: HttpClient) {}

  add(sector: Sector): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.newUrlPath + 'add', sector);
  }

  update(sector: Sector): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      sector
    );
  }

  delete(sector: Sector): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      sector
    );
  }

  getAll(): Observable<ListResponseModel<Sector>> {
    let path = this.newUrlPath + 'getall';
    return this.httpClient.get<ListResponseModel<Sector>>(path);
  }

  getDeletedAll(): Observable<ListResponseModel<Sector>> {
    let path = this.newUrlPath + 'getdeletedall';
    return this.httpClient.get<ListResponseModel<Sector>>(path);
  }

  getById(id: number): Observable<SingleResponseModel<Sector>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<Sector>>(path);
  }
}
