import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response/responseModel';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { UniversityFacultyDTO } from '../models/dto/universityFacultyDTO';
import { UniversityFaculty } from '../models/component/universityFacult';

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

  getAllDTO(): Observable<ListResponseModel<UniversityFacultyDTO>> {
    let path = this.newUrlPath + 'getalldto';
    return this.httpClient.get<ListResponseModel<UniversityFacultyDTO>>(path);
  }

  getDeletedAllDTO(): Observable<ListResponseModel<UniversityFacultyDTO>> {
    let path = this.newUrlPath + 'getdeletedalldto';
    return this.httpClient.get<ListResponseModel<UniversityFacultyDTO>>(path);
  }
}
