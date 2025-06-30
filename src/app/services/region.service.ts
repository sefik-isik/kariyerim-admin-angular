import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response/responseModel';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { Region } from '../models/component/region';
import { RegionDTO } from '../models/dto/regionDTO';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  newUrlPath: string = ApiUrl + 'Regions/';

  constructor(private httpClient: HttpClient) {}

  add(region: Region): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.newUrlPath + 'add', region);
  }

  update(region: Region): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      region
    );
  }

  delete(region: Region): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      region
    );
  }

  terminate(region: Region): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      region
    );
  }

  getAll(): Observable<ListResponseModel<Region>> {
    let path = this.newUrlPath + 'getall';
    return this.httpClient.get<ListResponseModel<Region>>(path);
  }

  getDeletedAll(): Observable<ListResponseModel<Region>> {
    let path = this.newUrlPath + 'getdeletedall';
    return this.httpClient.get<ListResponseModel<Region>>(path);
  }

  getById(id: string): Observable<SingleResponseModel<Region>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<Region>>(path);
  }
  getAllDTO(): Observable<ListResponseModel<RegionDTO>> {
    let path = this.newUrlPath + 'getalldto';
    return this.httpClient.get<ListResponseModel<RegionDTO>>(path);
  }

  getDeletedAllDTO(): Observable<ListResponseModel<RegionDTO>> {
    let path = this.newUrlPath + 'getdeletedalldto';
    return this.httpClient.get<ListResponseModel<RegionDTO>>(path);
  }
}
