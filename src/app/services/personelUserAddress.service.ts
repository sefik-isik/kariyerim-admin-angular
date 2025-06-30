import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response/responseModel';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { PersonelUserAddress } from '../models/component/personelUserAddress';
import { PersonelUserAddressDTO } from '../models/dto/personelUserAddressDTO';
import { AdminModel } from '../models/auth/adminModel';

@Injectable({
  providedIn: 'root',
})
export class PersonelUserAddressService {
  newUrlPath: string = ApiUrl + 'PersonelUserAddresses/';

  constructor(private httpClient: HttpClient) {}

  add(personelUserAddress: PersonelUserAddress): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      personelUserAddress
    );
  }

  update(personelUserAddress: PersonelUserAddress): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      personelUserAddress
    );
  }

  delete(personelUserAddress: PersonelUserAddress): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      personelUserAddress
    );
  }

  terminate(
    personelUserAddress: PersonelUserAddress
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      personelUserAddress
    );
  }

  getAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserAddress>> {
    return this.httpClient.post<ListResponseModel<PersonelUserAddress>>(
      this.newUrlPath + 'getall',
      adminModel
    );
  }

  getDeletedAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserAddress>> {
    return this.httpClient.post<ListResponseModel<PersonelUserAddress>>(
      this.newUrlPath + 'getdeletedall',
      adminModel
    );
  }

  getById(
    adminModel: AdminModel
  ): Observable<SingleResponseModel<PersonelUserAddress>> {
    return this.httpClient.post<SingleResponseModel<PersonelUserAddress>>(
      this.newUrlPath + 'getbyid',
      adminModel
    );
  }

  getAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserAddressDTO>> {
    return this.httpClient.post<ListResponseModel<PersonelUserAddressDTO>>(
      this.newUrlPath + 'getalldto',
      adminModel
    );
  }

  getDeletedAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserAddressDTO>> {
    return this.httpClient.post<ListResponseModel<PersonelUserAddressDTO>>(
      this.newUrlPath + 'getdeletedalldto',
      adminModel
    );
  }
}
