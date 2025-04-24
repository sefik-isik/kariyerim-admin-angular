import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { LanguageLevel } from '../models/languageLevel';

@Injectable({
  providedIn: 'root',
})
export class LanguageLevelService {
  newUrlPath: string = ApiUrl + 'LanguageLevels/';

  constructor(private httpClient: HttpClient) {}

  add(languageLevel: LanguageLevel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      languageLevel
    );
  }

  update(languageLevel: LanguageLevel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      languageLevel
    );
  }

  delete(languageLevel: LanguageLevel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      languageLevel
    );
  }

  getAll(): Observable<ListResponseModel<LanguageLevel>> {
    let path = this.newUrlPath + 'getall';
    return this.httpClient.get<ListResponseModel<LanguageLevel>>(path);
  }

  getById(id: number): Observable<SingleResponseModel<LanguageLevel>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<LanguageLevel>>(path);
  }
}
