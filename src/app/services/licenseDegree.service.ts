import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response/responseModel';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { LicenseDegree } from '../models/component/licenseDegree';

@Injectable({
  providedIn: 'root',
})
export class LicenseDegreeService {
  newUrlPath: string = ApiUrl + 'LicenseDegrees/';

  constructor(private httpClient: HttpClient) {}

  add(licenseDegree: LicenseDegree): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      licenseDegree
    );
  }

  update(licenseDegree: LicenseDegree): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      licenseDegree
    );
  }

  delete(licenseDegree: LicenseDegree): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      licenseDegree
    );
  }

  terminate(licenseDegree: LicenseDegree): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      licenseDegree
    );
  }

  getAll(): Observable<ListResponseModel<LicenseDegree>> {
    let path = this.newUrlPath + 'getall';
    return this.httpClient.get<ListResponseModel<LicenseDegree>>(path);
  }

  getDeletedAll(): Observable<ListResponseModel<LicenseDegree>> {
    let path = this.newUrlPath + 'getdeletedall';
    return this.httpClient.get<ListResponseModel<LicenseDegree>>(path);
  }

  getById(id: string): Observable<SingleResponseModel<LicenseDegree>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<LicenseDegree>>(path);
  }
}
