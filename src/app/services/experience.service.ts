import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response/responseModel';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { Experience } from '../models/component/experience';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  newUrlPath: string = ApiUrl + 'Experiences/';

  constructor(private httpClient: HttpClient) {}

  add(experience: Experience): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      experience
    );
  }

  update(experience: Experience): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      experience
    );
  }

  delete(experience: Experience): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      experience
    );
  }

  terminate(experience: Experience): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      experience
    );
  }

  getAll(): Observable<ListResponseModel<Experience>> {
    let path = this.newUrlPath + 'getall';
    return this.httpClient.get<ListResponseModel<Experience>>(path);
  }

  getDeletedAll(): Observable<ListResponseModel<Experience>> {
    let path = this.newUrlPath + 'getdeletedall';
    return this.httpClient.get<ListResponseModel<Experience>>(path);
  }

  getById(id: string): Observable<SingleResponseModel<Experience>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<Experience>>(path);
  }
}
