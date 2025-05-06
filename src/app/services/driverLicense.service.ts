import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { DriverLicence } from '../models/driverLicence';

@Injectable({
  providedIn: 'root',
})
export class DriverLicenceService {
  newUrlPath: string = ApiUrl + 'DriverLicences/';

  constructor(private httpClient: HttpClient) {}

  add(driverLicence: DriverLicence): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      driverLicence
    );
  }

  update(driverLicence: DriverLicence): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      driverLicence
    );
  }

  delete(driverLicence: DriverLicence): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      driverLicence
    );
  }

  getAll(): Observable<ListResponseModel<DriverLicence>> {
    let path = this.newUrlPath + 'getall';
    return this.httpClient.get<ListResponseModel<DriverLicence>>(path);
  }

  getDeletedAll(): Observable<ListResponseModel<DriverLicence>> {
    let path = this.newUrlPath + 'getdeletedall';
    return this.httpClient.get<ListResponseModel<DriverLicence>>(path);
  }

  getById(id: number): Observable<SingleResponseModel<DriverLicence>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<DriverLicence>>(path);
  }
}
