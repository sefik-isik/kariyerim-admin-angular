import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UniversityFaculty } from '../models/component/universityFaculty';
import { ApiUrl } from '../models/concrete/apiUrl';
import { ListResponseModel } from '../models/response/listResponseModel';
import { ResponseModel } from '../models/response/responseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class UniversityFacultyService {
  newUrlPath: string = ApiUrl + 'UniversityFaculties/';

  constructor(private httpClient: HttpClient) {}

  add(universityFaculty: UniversityFaculty): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      universityFaculty
    );
  }

  update(universityFaculty: UniversityFaculty): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      universityFaculty
    );
  }

  delete(universityFaculty: UniversityFaculty): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      universityFaculty
    );
  }

  terminate(universityFaculty: UniversityFaculty): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      universityFaculty
    );
  }

  getAll(): Observable<ListResponseModel<UniversityFaculty>> {
    let path = this.newUrlPath + 'getall';
    return this.httpClient.get<ListResponseModel<UniversityFaculty>>(path);
  }

  getDeletedAll(): Observable<ListResponseModel<UniversityFaculty>> {
    let path = this.newUrlPath + 'getdeletedall';
    return this.httpClient.get<ListResponseModel<UniversityFaculty>>(path);
  }

  getById(id: string): Observable<SingleResponseModel<UniversityFaculty>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<UniversityFaculty>>(path);
  }
}
