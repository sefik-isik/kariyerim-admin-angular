import { AdminModel } from './../models/adminModel';
import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/responseModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserOperationClaim } from '../models/userOperationClaim';
import { UserOperationClaimDTO } from '../models/userOperationClaimDTO';

@Injectable({
  providedIn: 'root',
})
export class UserOperationClaimService {
  newUrlPath: string = ApiUrl + 'UserOperationClaims/';

  constructor(private httpClient: HttpClient) {}

  update(userOperationClaim: UserOperationClaim): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      userOperationClaim
    );
  }

  delete(userOperationClaim: UserOperationClaim): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      userOperationClaim
    );
  }

  getAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<UserOperationClaim>> {
    return this.httpClient.post<ListResponseModel<UserOperationClaim>>(
      this.newUrlPath + 'getall',
      adminModel
    );
  }

  getDeletedAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<UserOperationClaim>> {
    return this.httpClient.post<ListResponseModel<UserOperationClaim>>(
      this.newUrlPath + 'getdeletedall',
      adminModel
    );
  }

  getById(
    adminModel: AdminModel
  ): Observable<SingleResponseModel<UserOperationClaim>> {
    return this.httpClient.post<SingleResponseModel<UserOperationClaim>>(
      this.newUrlPath + 'getbyid',
      adminModel
    );
  }

  getAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<UserOperationClaimDTO>> {
    return this.httpClient.post<ListResponseModel<UserOperationClaimDTO>>(
      this.newUrlPath + 'getalldto',
      adminModel
    );
  }

  getAllDeletedDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<UserOperationClaimDTO>> {
    return this.httpClient.post<ListResponseModel<UserOperationClaimDTO>>(
      this.newUrlPath + 'getalldeleteddto',
      adminModel
    );
  }
}
