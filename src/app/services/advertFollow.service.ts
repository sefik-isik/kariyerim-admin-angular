import { ApiUrl } from '../models/concrete/apiUrl';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { ResponseModel } from '../models/response/responseModel';
import { AdminModel } from '../models/auth/adminModel';
import { AdvertFollowDTO } from '../models/dto/advertFollowDTO';
import { AdvertFollow } from '../models/component/advertFollow';

@Injectable({
  providedIn: 'root',
})
export class AdvertFollowService {
  newUrlPath: string = ApiUrl + 'AdvertFollows/';

  constructor(private httpClient: HttpClient) {}

  add(advertFollow: AdvertFollow): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      advertFollow
    );
  }

  terminate(advertFollow: AdvertFollow): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      advertFollow
    );
  }

  getAll(adminModel: AdminModel): Observable<ListResponseModel<AdvertFollow>> {
    return this.httpClient.post<ListResponseModel<AdvertFollow>>(
      this.newUrlPath + 'getall',
      adminModel
    );
  }

  getById(id: string): Observable<SingleResponseModel<AdvertFollow>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<AdvertFollow>>(path);
  }

  getAllByCompanyId(id: string): Observable<SingleResponseModel<AdvertFollow>> {
    let path = this.newUrlPath + 'getallbycompanyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<AdvertFollow>>(path);
  }

  getAllByPersonelId(
    id: string
  ): Observable<SingleResponseModel<AdvertFollow>> {
    let path = this.newUrlPath + 'getallbypersonelid?id=' + id;
    return this.httpClient.get<SingleResponseModel<AdvertFollow>>(path);
  }

  getAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<AdvertFollowDTO>> {
    return this.httpClient.post<ListResponseModel<AdvertFollowDTO>>(
      this.newUrlPath + 'getalldto',
      adminModel
    );
  }

  getAllByCompanyIdDTO(
    id: string
  ): Observable<SingleResponseModel<AdvertFollowDTO>> {
    let path = this.newUrlPath + 'getallbycompanyiddto?id=' + id;
    return this.httpClient.get<SingleResponseModel<AdvertFollowDTO>>(path);
  }

  getAllByPersonelIdDTO(
    id: string
  ): Observable<SingleResponseModel<AdvertFollowDTO>> {
    let path = this.newUrlPath + 'getallbypersoneliddto?id=' + id;
    return this.httpClient.get<SingleResponseModel<AdvertFollowDTO>>(path);
  }
}
