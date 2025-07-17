import { ApiUrl } from '../models/concrete/apiUrl';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { ResponseModel } from '../models/response/responseModel';
import { AdminModel } from '../models/auth/adminModel';
import { CompanyFollowDTO } from '../models/dto/companyFollowDTO';
import { PersonelUserFollowCompanyUser } from '../models/component/personelUserFollowCompanyUser';
import { PersonelUserFollowCompanyUserDTO } from '../models/dto/personelUserFollowCompanyUserDTO';

@Injectable({
  providedIn: 'root',
})
export class PersonelUserFollowCompanyUserService {
  newUrlPath: string = ApiUrl + 'PersonelUserFollowCompanyUsers/';

  constructor(private httpClient: HttpClient) {}

  add(
    personelUserFollowCompanyUser: PersonelUserFollowCompanyUser
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      personelUserFollowCompanyUser
    );
  }

  terminate(
    personelUserFollowCompanyUser: PersonelUserFollowCompanyUser
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      personelUserFollowCompanyUser
    );
  }

  getAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserFollowCompanyUser>> {
    return this.httpClient.post<
      ListResponseModel<PersonelUserFollowCompanyUser>
    >(this.newUrlPath + 'getall', adminModel);
  }

  getById(
    id: string
  ): Observable<SingleResponseModel<PersonelUserFollowCompanyUser>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<
      SingleResponseModel<PersonelUserFollowCompanyUser>
    >(path);
  }

  getAllByCompanyId(
    id: string
  ): Observable<SingleResponseModel<PersonelUserFollowCompanyUser>> {
    let path = this.newUrlPath + 'getallbycompanyid?id=' + id;
    return this.httpClient.get<
      SingleResponseModel<PersonelUserFollowCompanyUser>
    >(path);
  }

  getAllByPersonelId(
    id: string
  ): Observable<SingleResponseModel<PersonelUserFollowCompanyUser>> {
    let path = this.newUrlPath + 'getallbypersonelid?id=' + id;
    return this.httpClient.get<
      SingleResponseModel<PersonelUserFollowCompanyUser>
    >(path);
  }

  getAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserFollowCompanyUserDTO>> {
    return this.httpClient.post<
      ListResponseModel<PersonelUserFollowCompanyUserDTO>
    >(this.newUrlPath + 'getalldto', adminModel);
  }

  getAllByCompanyIdDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserFollowCompanyUserDTO>> {
    return this.httpClient.post<
      ListResponseModel<PersonelUserFollowCompanyUserDTO>
    >(this.newUrlPath + 'getallbycompanyiddto', adminModel);
  }

  getAllByPersonelIdDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserFollowCompanyUserDTO>> {
    return this.httpClient.post<
      ListResponseModel<PersonelUserFollowCompanyUserDTO>
    >(this.newUrlPath + 'getallbypersoneliddto', adminModel);
  }
}
