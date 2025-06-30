import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response/responseModel';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { Language } from '../models/component/language';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  newUrlPath: string = ApiUrl + 'Languages/';

  constructor(private httpClient: HttpClient) {}

  add(language: Language): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      language
    );
  }

  update(language: Language): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      language
    );
  }

  delete(language: Language): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      language
    );
  }

  terminate(language: Language): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      language
    );
  }

  getAll(): Observable<ListResponseModel<Language>> {
    let path = this.newUrlPath + 'getall';
    return this.httpClient.get<ListResponseModel<Language>>(path);
  }
  getDeletedAll(): Observable<ListResponseModel<Language>> {
    let path = this.newUrlPath + 'getdeletedall';
    return this.httpClient.get<ListResponseModel<Language>>(path);
  }

  getById(id: string): Observable<SingleResponseModel<Language>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<Language>>(path);
  }
}
