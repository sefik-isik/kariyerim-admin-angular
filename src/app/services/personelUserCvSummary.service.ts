import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { PersonelUserCvSummary } from '../models/personelUserCvSummary';

@Injectable({
  providedIn: 'root',
})
export class PersonelUserCvSummaryService {
  newUrlPath: string = ApiUrl + 'PersonelUserCvSummaries/';

  constructor(private httpClient: HttpClient) {}

  add(personelUserCvSummary: PersonelUserCvSummary): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      personelUserCvSummary
    );
  }

  update(
    personelUserCvSummary: PersonelUserCvSummary
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      personelUserCvSummary
    );
  }

  delete(
    personelUserCvSummary: PersonelUserCvSummary
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      personelUserCvSummary
    );
  }

  getAll(id: number): Observable<ListResponseModel<PersonelUserCvSummary>> {
    let path = this.newUrlPath + 'getall?id=' + id;
    return this.httpClient.get<ListResponseModel<PersonelUserCvSummary>>(path);
  }

  getById(id: number): Observable<SingleResponseModel<PersonelUserCvSummary>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<PersonelUserCvSummary>>(
      path
    );
  }
}
