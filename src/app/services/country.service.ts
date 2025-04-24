import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  newUrlPath: string = ApiUrl + 'Countries/';

  constructor(private httpClient: HttpClient) {}

  add(country: Country): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      country
    );
  }

  update(country: Country): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      country
    );
  }

  delete(country: Country): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      country
    );
  }

  getAll(): Observable<ListResponseModel<Country>> {
    let path = this.newUrlPath + 'getall';
    return this.httpClient.get<ListResponseModel<Country>>(path);
  }

  getById(id: number): Observable<SingleResponseModel<Country>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<Country>>(path);
  }
}
