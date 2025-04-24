import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/responseModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserOperationClaim } from '../models/userOperationClaim';

@Injectable({
  providedIn: 'root',
})
export class UserOperationClaimService {
  newUrlPath: string = ApiUrl + 'UserOperationClaims/';

  constructor(private httpClient: HttpClient) {}

  add(userOperationClaim: UserOperationClaim): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      userOperationClaim
    );
  }

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

  getAll(): Observable<ListResponseModel<UserOperationClaim>> {
    let path = this.newUrlPath + 'getall';
    return this.httpClient.get<ListResponseModel<UserOperationClaim>>(path);
  }

  getById(id: number): Observable<SingleResponseModel<UserOperationClaim>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<UserOperationClaim>>(path);
  }
}
