import { ApiUrl } from './../models/apiUrl';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { City } from '../models/city';
import { SingleResponseModel } from '../models/singleResponseModel';
import { CityDTO } from '../models/cityDTO';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  newUrlPath: string = ApiUrl + 'Cities/';

  constructor(private httpClient: HttpClient) {}

  add(city: City): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.newUrlPath + 'add', city);
  }

  update(city: City): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      city
    );
  }

  delete(city: City): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      city
    );
  }

  getAll(): Observable<ListResponseModel<City>> {
    let path = this.newUrlPath + 'getall';
    return this.httpClient.get<ListResponseModel<City>>(path);
  }

  getDeletedAll(): Observable<ListResponseModel<City>> {
    let path = this.newUrlPath + 'getdeletedall';
    return this.httpClient.get<ListResponseModel<City>>(path);
  }

  getById(id: number): Observable<SingleResponseModel<City>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<City>>(path);
  }

  getAllDTO(): Observable<ListResponseModel<CityDTO>> {
    let path = this.newUrlPath + 'getalldto';
    return this.httpClient.get<ListResponseModel<CityDTO>>(path);
  }

  getDeletedAllDTO(): Observable<ListResponseModel<CityDTO>> {
    let path = this.newUrlPath + 'getdeletedalldto';
    return this.httpClient.get<ListResponseModel<CityDTO>>(path);
  }
}
