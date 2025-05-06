import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Language } from '../models/language';

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

  getAll(): Observable<ListResponseModel<Language>> {
    let path = this.newUrlPath + 'getall';
    return this.httpClient.get<ListResponseModel<Language>>(path);
  }
  getDeletedAll(): Observable<ListResponseModel<Language>> {
    let path = this.newUrlPath + 'getdeletedall';
    return this.httpClient.get<ListResponseModel<Language>>(path);
  }

  getById(id: number): Observable<SingleResponseModel<Language>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<Language>>(path);
  }
}
