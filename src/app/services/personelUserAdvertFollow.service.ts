import { ApiUrl } from '../models/concrete/apiUrl';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { ResponseModel } from '../models/response/responseModel';
import { AdminModel } from '../models/auth/adminModel';
import { PersonelUserAdvertFollow } from '../models/component/personelUserAdvertFollow';
import { PersonelUserAdvertFollowDTO } from './../models/dto/personelUserAdvertFollowDTO';

@Injectable({
  providedIn: 'root',
})
export class PersonelUserAdvertFollowService {
  newUrlPath: string = ApiUrl + 'PersonelUserAdvertFollows/';

  constructor(private httpClient: HttpClient) {}

  add(
    personelUserAdvertFollow: PersonelUserAdvertFollow
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      personelUserAdvertFollow
    );
  }

  terminate(
    personelUserAdvertFollow: PersonelUserAdvertFollow
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      personelUserAdvertFollow
    );
  }

  getAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserAdvertFollow>> {
    return this.httpClient.post<ListResponseModel<PersonelUserAdvertFollow>>(
      this.newUrlPath + 'getall',
      adminModel
    );
  }

  getById(
    id: string
  ): Observable<SingleResponseModel<PersonelUserAdvertFollow>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<PersonelUserAdvertFollow>>(
      path
    );
  }

  getAllByCompanyId(
    id: string
  ): Observable<SingleResponseModel<PersonelUserAdvertFollow>> {
    let path = this.newUrlPath + 'getallbycompanyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<PersonelUserAdvertFollow>>(
      path
    );
  }

  getAllByPersonelId(
    id: string
  ): Observable<SingleResponseModel<PersonelUserAdvertFollow>> {
    let path = this.newUrlPath + 'getallbypersonelid?id=' + id;
    return this.httpClient.get<SingleResponseModel<PersonelUserAdvertFollow>>(
      path
    );
  }

  getAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserAdvertFollowDTO>> {
    return this.httpClient.post<ListResponseModel<PersonelUserAdvertFollowDTO>>(
      this.newUrlPath + 'getalldto',
      adminModel
    );
  }

  getAllByAdvertIdDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserAdvertFollowDTO>> {
    return this.httpClient.post<ListResponseModel<PersonelUserAdvertFollowDTO>>(
      this.newUrlPath + 'getallbyadvertiddto',
      adminModel
    );
  }

  getAllByCompanyIdDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserAdvertFollowDTO>> {
    return this.httpClient.post<ListResponseModel<PersonelUserAdvertFollowDTO>>(
      this.newUrlPath + 'getallbycompanyiddto',
      adminModel
    );
  }

  getAllByPersonelIdDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserAdvertFollowDTO>> {
    return this.httpClient.post<ListResponseModel<PersonelUserAdvertFollowDTO>>(
      this.newUrlPath + 'getallbypersoneliddto',
      adminModel
    );
  }
}
