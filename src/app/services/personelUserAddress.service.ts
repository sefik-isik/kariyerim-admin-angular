import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { PersonelUserAddress } from '../models/personelUserAddress';
import { PersonelUserAddressDTO } from '../models/personelUserAddressDTO';

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

  getAll(id: number): Observable<ListResponseModel<PersonelUserAddress>> {
    let path = this.newUrlPath + 'getall?id=' + id;
    return this.httpClient.get<ListResponseModel<PersonelUserAddress>>(path);
  }

  getDeletedAll(): Observable<ListResponseModel<PersonelUserAddress>> {
    let path = this.newUrlPath + 'getdeletedall';
    return this.httpClient.get<ListResponseModel<PersonelUserAddress>>(path);
  }

  getById(id: number): Observable<SingleResponseModel<PersonelUserAddress>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<PersonelUserAddress>>(path);
  }

  getAllDTO(id: number): Observable<ListResponseModel<PersonelUserAddressDTO>> {
    let path = this.newUrlPath + 'getalldto?id=' + id;
    return this.httpClient.get<ListResponseModel<PersonelUserAddressDTO>>(path);
  }

  getAllDeletedDTO(
    id: number
  ): Observable<ListResponseModel<PersonelUserAddressDTO>> {
    let path = this.newUrlPath + 'getalldeleteddto?id=' + id;
    return this.httpClient.get<ListResponseModel<PersonelUserAddressDTO>>(path);
  }
}
