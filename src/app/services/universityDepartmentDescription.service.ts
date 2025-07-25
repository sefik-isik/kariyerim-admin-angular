import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UniversityDepartmentDescription } from '../models/component/universityDepartmentDescription';
import { ApiUrl } from '../models/concrete/apiUrl';
import { UniversityDepartmentDescriptionDTO } from '../models/dto/universityDepartmentDescriptionDTO';
import { ListResponseModel } from '../models/response/listResponseModel';
import { ResponseModel } from '../models/response/responseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class UniversityDepartmentDescriptionService {
  newUrlPath: string = ApiUrl + 'UniversityDepartmentDescriptions/';

  constructor(private httpClient: HttpClient) {}

  add(
    universityDepartmentDescription: UniversityDepartmentDescription
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      universityDepartmentDescription
    );
  }

  update(
    universityDepartmentDescription: UniversityDepartmentDescription
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      universityDepartmentDescription
    );
  }

  delete(
    universityDepartmentDescription: UniversityDepartmentDescription
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      universityDepartmentDescription
    );
  }

  terminate(
    universityDepartmentDescription: UniversityDepartmentDescription
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      universityDepartmentDescription
    );
  }

  getAll(): Observable<ListResponseModel<UniversityDepartmentDescription>> {
    let path = this.newUrlPath + 'getall';
    return this.httpClient.get<
      ListResponseModel<UniversityDepartmentDescription>
    >(path);
  }

  getDeletedAll(): Observable<
    ListResponseModel<UniversityDepartmentDescription>
  > {
    let path = this.newUrlPath + 'getdeletedall';
    return this.httpClient.get<
      ListResponseModel<UniversityDepartmentDescription>
    >(path);
  }

  getById(
    id: string
  ): Observable<SingleResponseModel<UniversityDepartmentDescription>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<
      SingleResponseModel<UniversityDepartmentDescription>
    >(path);
  }

  getAllDTO(): Observable<
    ListResponseModel<UniversityDepartmentDescriptionDTO>
  > {
    let path = this.newUrlPath + 'getalldto';
    return this.httpClient.get<
      ListResponseModel<UniversityDepartmentDescriptionDTO>
    >(path);
  }

  getDeletedAllDTO(): Observable<
    ListResponseModel<UniversityDepartmentDescriptionDTO>
  > {
    let path = this.newUrlPath + 'getdeletedalldto';
    return this.httpClient.get<
      ListResponseModel<UniversityDepartmentDescriptionDTO>
    >(path);
  }
}
