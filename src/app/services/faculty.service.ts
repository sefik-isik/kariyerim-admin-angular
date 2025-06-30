import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response/responseModel';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { Faculty } from '../models/component/faculty';

@Injectable({
  providedIn: 'root',
})
export class FacultyService {
  newUrlPath: string = ApiUrl + 'Faculties/';

  constructor(private httpClient: HttpClient) {}

  add(faculty: Faculty): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      faculty
    );
  }

  update(faculty: Faculty): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      faculty
    );
  }

  delete(faculty: Faculty): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      faculty
    );
  }

  terminate(faculty: Faculty): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      faculty
    );
  }

  getAll(): Observable<ListResponseModel<Faculty>> {
    let path = this.newUrlPath + 'getall';
    return this.httpClient.get<ListResponseModel<Faculty>>(path);
  }

  getDeletedAll(): Observable<ListResponseModel<Faculty>> {
    let path = this.newUrlPath + 'getdeletedall';
    return this.httpClient.get<ListResponseModel<Faculty>>(path);
  }

  getById(id: string): Observable<SingleResponseModel<Faculty>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<Faculty>>(path);
  }
}
