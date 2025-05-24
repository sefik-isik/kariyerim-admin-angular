import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient } from '@angular/common/http';
import { CompanyUserAddress } from '../models/companyUserAddress';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { CompanyUserAddressDTO } from '../models/CompanyUserAddressDTO';
import { ResponseModel } from '../models/responseModel';
import { AdminModel } from '../models/adminModel';

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

  getAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<CompanyUserAddress>> {
    return this.httpClient.post<ListResponseModel<CompanyUserAddress>>(
      this.newUrlPath + 'getall',
      adminModel
    );
  }

  getDeletedAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<CompanyUserAddress>> {
    return this.httpClient.post<ListResponseModel<CompanyUserAddress>>(
      this.newUrlPath + 'getdeletedall',
      adminModel
    );
  }

  getById(
    adminModel: AdminModel
  ): Observable<SingleResponseModel<CompanyUserAddress>> {
    return this.httpClient.post<SingleResponseModel<CompanyUserAddress>>(
      this.newUrlPath + 'getbyid',
      adminModel
    );
  }

  getAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<CompanyUserAddressDTO>> {
    return this.httpClient.post<ListResponseModel<CompanyUserAddressDTO>>(
      this.newUrlPath + 'getalldto',
      adminModel
    );
  }

  getDeletedAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<CompanyUserAddressDTO>> {
    return this.httpClient.post<ListResponseModel<CompanyUserAddressDTO>>(
      this.newUrlPath + 'getdeletedalldto',
      adminModel
    );
  }
}
