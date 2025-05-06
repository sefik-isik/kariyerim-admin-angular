import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TaxOffice } from '../models/taxOffice';
import { TaxOfficeDTO } from '../models/taxOfficeDTO';

@Injectable({
  providedIn: 'root',
})
export class TaxOfficeService {
  newUrlPath: string = ApiUrl + 'TaxOffices/';

  constructor(private httpClient: HttpClient) {}

  add(taxOffice: TaxOffice): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      taxOffice
    );
  }

  update(taxOffice: TaxOffice): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      taxOffice
    );
  }

  delete(taxOffice: TaxOffice): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      taxOffice
    );
  }

  getAll(): Observable<ListResponseModel<TaxOffice>> {
    let path = this.newUrlPath + 'getall';
    return this.httpClient.get<ListResponseModel<TaxOffice>>(path);
  }

  getDeletedAll(): Observable<ListResponseModel<TaxOffice>> {
    let path = this.newUrlPath + 'getdeletedall';
    return this.httpClient.get<ListResponseModel<TaxOffice>>(path);
  }

  getById(id: number): Observable<SingleResponseModel<TaxOffice>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<TaxOffice>>(path);
  }

  getAllDTO(): Observable<ListResponseModel<TaxOfficeDTO>> {
    let path = this.newUrlPath + 'getalldto';
    return this.httpClient.get<ListResponseModel<TaxOfficeDTO>>(path);
  }

  getAllDeletedDTO(): Observable<ListResponseModel<TaxOfficeDTO>> {
    let path = this.newUrlPath + 'getalldeleteddto';
    return this.httpClient.get<ListResponseModel<TaxOfficeDTO>>(path);
  }
}
