import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UniversityDepartment } from '../models/component/universityDepartment';
import { ResponseModel } from '../models/response/responseModel';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { UniversityDepartmentDTO } from '../models/dto/universityDepartmentDTO';

@Injectable({
  providedIn: 'root',
})
export class UniversityDepartmentService {
  newUrlPath: string = ApiUrl + 'UniversityDepartments/';

  constructor(private httpClient: HttpClient) {}

  add(university: UniversityDepartment): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      university
    );
  }

  update(university: UniversityDepartment): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      university
    );
  }

  delete(university: UniversityDepartment): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      university
    );
  }

  terminate(university: UniversityDepartment): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      university
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

  getById(id: string): Observable<SingleResponseModel<UniversityDepartment>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<UniversityDepartment>>(path);
  }

  getAllDTO(): Observable<ListResponseModel<UniversityDepartmentDTO>> {
    let path = this.newUrlPath + 'getalldto';
    return this.httpClient.get<ListResponseModel<UniversityDepartmentDTO>>(
      path
    );
  }

  getDeletedAllDTO(): Observable<ListResponseModel<UniversityDepartmentDTO>> {
    let path = this.newUrlPath + 'getdeletedalldto';
    return this.httpClient.get<ListResponseModel<UniversityDepartmentDTO>>(
      path
    );
  }
}
