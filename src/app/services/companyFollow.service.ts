import { ApiUrl } from '../models/concrete/apiUrl';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { ResponseModel } from '../models/response/responseModel';
import { AdminModel } from '../models/auth/adminModel';
import { CompanyFollowDTO } from '../models/dto/companyFollowDTO';
import { CompanyFollow } from '../models/component/companyFollow';

@Injectable({
  providedIn: 'root',
})
export class CompanyFollowService {
  newUrlPath: string = ApiUrl + 'AdvertFollows/';

  constructor(private httpClient: HttpClient) {}

  add(companyFollowDTO: CompanyFollow): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      companyFollowDTO
    );
  }

  terminate(companyFollowDTO: CompanyFollow): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      companyFollowDTO
    );
  }

  getAll(adminModel: AdminModel): Observable<ListResponseModel<CompanyFollow>> {
    return this.httpClient.post<ListResponseModel<CompanyFollow>>(
      this.newUrlPath + 'getall',
      adminModel
    );
  }

  getById(id: string): Observable<SingleResponseModel<CompanyFollow>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<CompanyFollow>>(path);
  }

  getAllByCompanyId(
    id: string
  ): Observable<SingleResponseModel<CompanyFollow>> {
    let path = this.newUrlPath + 'getallbycompanyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<CompanyFollow>>(path);
  }

  getAllByPersonelId(
    id: string
  ): Observable<SingleResponseModel<CompanyFollow>> {
    let path = this.newUrlPath + 'getallbypersonelid?id=' + id;
    return this.httpClient.get<SingleResponseModel<CompanyFollow>>(path);
  }

  getAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<CompanyFollowDTO>> {
    return this.httpClient.post<ListResponseModel<CompanyFollowDTO>>(
      this.newUrlPath + 'getalldto',
      adminModel
    );
  }

  getAllByCompanyIdDTO(
    id: string
  ): Observable<SingleResponseModel<CompanyFollowDTO>> {
    let path = this.newUrlPath + 'getallbycompanyiddto?id=' + id;
    return this.httpClient.get<SingleResponseModel<CompanyFollowDTO>>(path);
  }

  getAllByPersonelIdDTO(
    id: string
  ): Observable<SingleResponseModel<CompanyFollowDTO>> {
    let path = this.newUrlPath + 'getallbypersoneliddto?id=' + id;
    return this.httpClient.get<SingleResponseModel<CompanyFollowDTO>>(path);
  }
}
