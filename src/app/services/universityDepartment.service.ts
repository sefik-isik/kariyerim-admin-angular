import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { UniversityDepartment } from '../models/universityDepartment';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UniversityDepartmentDTO } from '../models/universityDepartmentDTO';

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

  getAll(): Observable<ListResponseModel<UniversityDepartment>> {
    let path = this.newUrlPath + 'getall';
    return this.httpClient.get<ListResponseModel<UniversityDepartment>>(path);
  }

  getDeletedAll(): Observable<ListResponseModel<UniversityDepartment>> {
    let path = this.newUrlPath + 'getdeletedall';
    return this.httpClient.get<ListResponseModel<UniversityDepartment>>(path);
  }

  getById(id: number): Observable<SingleResponseModel<UniversityDepartment>> {
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
