import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { PersonelUserImage } from '../models/personelUserImage';
import { AdminModel } from '../models/adminModel';

import { PersonelUserImageDTO } from '../models/personelUserImageDTO';

@Injectable({
  providedIn: 'root',
})
export class PersonelUserImageService {
  newUrlPath: string = ApiUrl + 'PersonelUserImages/';

  constructor(private httpClient: HttpClient) {}

  add(personelUserImage: PersonelUserImage): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      personelUserImage
    );
  }

  update(personelUserImage: PersonelUserImage): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      personelUserImage
    );
  }

  delete(personelUserImage: PersonelUserImage): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      personelUserImage
    );
  }

  getAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserImage>> {
    return this.httpClient.post<ListResponseModel<PersonelUserImage>>(
      this.newUrlPath + 'getall',
      adminModel
    );
  }

  getDeletedAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserImage>> {
    return this.httpClient.post<ListResponseModel<PersonelUserImage>>(
      this.newUrlPath + 'getdeletedall',
      adminModel
    );
  }

  getById(
    adminModel: AdminModel
  ): Observable<SingleResponseModel<PersonelUserImage>> {
    return this.httpClient.post<SingleResponseModel<PersonelUserImage>>(
      this.newUrlPath + 'getbyid',
      adminModel
    );
  }

  getAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserImageDTO>> {
    return this.httpClient.post<ListResponseModel<PersonelUserImageDTO>>(
      this.newUrlPath + 'getalldto',
      adminModel
    );
  }

  getAllDeletedDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserImageDTO>> {
    return this.httpClient.post<ListResponseModel<PersonelUserImageDTO>>(
      this.newUrlPath + 'getalldeleteddto',
      adminModel
    );
  }
}
