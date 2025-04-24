import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient } from '@angular/common/http';
import { CompanyUserAddress } from '../models/companyUserAddress';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { CompanyUserAddressDTO } from '../models/CompanyUserAddressDTO';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CompanyUserAddressService {
  newUrlPath: string = ApiUrl + 'CompanyUserAddresses/';

  constructor(private httpClient: HttpClient) {}

  add(companyUserAddress: CompanyUserAddress): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      companyUserAddress
    );
  }

  update(companyUserAddress: CompanyUserAddress): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      companyUserAddress
    );
  }

  delete(companyUserAddress: CompanyUserAddress): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      companyUserAddress
    );
  }

  getAll(id: number): Observable<ListResponseModel<CompanyUserAddress>> {
    let path = this.newUrlPath + 'getall?id=' + id;
    return this.httpClient.get<ListResponseModel<CompanyUserAddress>>(path);
  }

  getById(id: number): Observable<SingleResponseModel<CompanyUserAddress>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<CompanyUserAddress>>(path);
  }

  getAllDTO(id: number): Observable<ListResponseModel<CompanyUserAddressDTO>> {
    let path = this.newUrlPath + 'getalldto?id=' + id;
    return this.httpClient.get<ListResponseModel<CompanyUserAddressDTO>>(path);
  }
}
