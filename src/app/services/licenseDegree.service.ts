import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { LicenceDegree } from '../models/licenceDegree';

@Injectable({
  providedIn: 'root',
})
export class LicenceDegreeService {
  newUrlPath: string = ApiUrl + 'LicenceDegrees/';

  constructor(private httpClient: HttpClient) {}

  add(licenceDegree: LicenceDegree): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      licenceDegree
    );
  }

  update(licenceDegree: LicenceDegree): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      licenceDegree
    );
  }

  delete(licenceDegree: LicenceDegree): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      licenceDegree
    );
  }

  getAll(): Observable<ListResponseModel<LicenceDegree>> {
    let path = this.newUrlPath + 'getall';
    return this.httpClient.get<ListResponseModel<LicenceDegree>>(path);
  }

  getDeletedAll(): Observable<ListResponseModel<LicenceDegree>> {
    let path = this.newUrlPath + 'getdeletedall';
    return this.httpClient.get<ListResponseModel<LicenceDegree>>(path);
  }

  getById(id: number): Observable<SingleResponseModel<LicenceDegree>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<LicenceDegree>>(path);
  }
}
