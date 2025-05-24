import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';
import { DepartmentDetail } from '../models/departmentDetail';
import { DepartmentDetailDTO } from '../models/departmentDetailDTO';

@Injectable({
  providedIn: 'root',
})
export class DepartmentDetailService {
  newUrlPath: string = ApiUrl + 'DepartmentDetails/';

  constructor(private httpClient: HttpClient) {}

  add(DepartmentDetail: DepartmentDetail): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      DepartmentDetail
    );
  }

  update(DepartmentDetail: DepartmentDetail): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      DepartmentDetail
    );
  }

  delete(DepartmentDetail: DepartmentDetail): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      DepartmentDetail
    );
  }

  getAll(): Observable<ListResponseModel<DepartmentDetail>> {
    let path = this.newUrlPath + 'getall';
    return this.httpClient.get<ListResponseModel<DepartmentDetail>>(path);
  }

  getDeletedAll(): Observable<ListResponseModel<DepartmentDetail>> {
    let path = this.newUrlPath + 'getdeletedall';
    return this.httpClient.get<ListResponseModel<DepartmentDetail>>(path);
  }

  getById(id: number): Observable<SingleResponseModel<DepartmentDetail>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<DepartmentDetail>>(path);
  }

  getAllDTO(): Observable<ListResponseModel<DepartmentDetailDTO>> {
    let path = this.newUrlPath + 'getalldto';
    return this.httpClient.get<ListResponseModel<DepartmentDetailDTO>>(path);
  }

  getDeletedAllDTO(): Observable<ListResponseModel<DepartmentDetailDTO>> {
    let path = this.newUrlPath + 'getdeletedalldto';
    return this.httpClient.get<ListResponseModel<DepartmentDetailDTO>>(path);
  }
}
