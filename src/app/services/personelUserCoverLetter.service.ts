import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { PersonelUserCoverLetter } from '../models/personelUserCoverLetter';

@Injectable({
  providedIn: 'root',
})
export class PersonelUserCoverLetterService {
  newUrlPath: string = ApiUrl + 'PersonelUserCoverLetters/';

  constructor(private httpClient: HttpClient) {}

  add(
    personelUserCoverLetter: PersonelUserCoverLetter
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      personelUserCoverLetter
    );
  }

  update(
    personelUserCoverLetter: PersonelUserCoverLetter
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      personelUserCoverLetter
    );
  }

  delete(
    personelUserCoverLetter: PersonelUserCoverLetter
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      personelUserCoverLetter
    );
  }

  getAll(id: number): Observable<ListResponseModel<PersonelUserCoverLetter>> {
    let path = this.newUrlPath + 'getall?id=' + id;
    return this.httpClient.get<ListResponseModel<PersonelUserCoverLetter>>(
      path
    );
  }

  getById(
    id: number
  ): Observable<SingleResponseModel<PersonelUserCoverLetter>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<PersonelUserCoverLetter>>(
      path
    );
  }
}
