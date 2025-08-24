import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response/responseModel';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { UniversityDepartment } from '../models/component/universitydepartment';
import { PageModel } from '../models/base/pageModel';
import { UniversityDepartmentByPageDTO } from '../models/pageModel/universityDepartmentByPageDTO';

@Injectable({
  providedIn: 'root',
})
export class UniversityDepartmentService {
  newUrlPath: string = ApiUrl + 'UniversityDepartments/';

  constructor(private httpClient: HttpClient) {}

  add(universityDepartment: UniversityDepartment): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      universityDepartment
    );
  }

  update(
    universityDepartment: UniversityDepartment
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      universityDepartment
    );
  }

  delete(
    universityDepartment: UniversityDepartment
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      universityDepartment
    );
  }

  terminate(
    universityDepartment: UniversityDepartment
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      universityDepartment
    );
  }

  getAll(): Observable<ListResponseModel<UniversityDepartment>> {
    let path = this.newUrlPath + 'getall';
    return this.httpClient.get<ListResponseModel<UniversityDepartment>>(path);
  }

  getDeletedAll(): Observable<ListResponseModel<UniversityDepartment>> {
    let path = this.newUrlPath + 'getdeletedall';
    return this.httpClient.get<ListResponseModel<UniversityDepartment>>(path);
  }

  getAllByPage(
    pageModel: PageModel
  ): Observable<SingleResponseModel<UniversityDepartmentByPageDTO>> {
    return this.httpClient.post<
      SingleResponseModel<UniversityDepartmentByPageDTO>
    >(this.newUrlPath + 'getallbypage', pageModel);
  }

  getById(id: string): Observable<SingleResponseModel<UniversityDepartment>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<UniversityDepartment>>(path);
  }
}
