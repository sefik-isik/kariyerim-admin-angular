import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/responseModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { OperationClaim } from '../models/operationClaim';
import { AdminModel } from '../models/adminModel';

@Injectable({
  providedIn: 'root',
})
export class OperationClaimService {
  newUrlPath: string = ApiUrl + 'OperationClaims/';

  constructor(private httpClient: HttpClient) {}

  add(operationClaim: OperationClaim): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      operationClaim
    );
  }

  update(operationClaim: OperationClaim): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      operationClaim
    );
  }

  delete(operationClaim: OperationClaim): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      operationClaim
    );
  }

  getAll(): Observable<ListResponseModel<OperationClaim>> {
    return this.httpClient.get<ListResponseModel<OperationClaim>>(
      this.newUrlPath + 'getall'
    );
  }

  getDeletedAll(): Observable<ListResponseModel<OperationClaim>> {
    return this.httpClient.get<ListResponseModel<OperationClaim>>(
      this.newUrlPath + 'getdeletedall'
    );
  }

  getById(id: number): Observable<SingleResponseModel<OperationClaim>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<OperationClaim>>(path);
  }
}
