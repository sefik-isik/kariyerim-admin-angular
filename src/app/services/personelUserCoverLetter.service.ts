import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { PersonelUserCoverLetter } from '../models/personelUserCoverLetter';
import { AdminModel } from '../models/adminModel';
import { PersonelUserCoverLetterDTO } from '../models/PersonelUserCoverLetterDTO';

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

  getAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserCoverLetter>> {
    return this.httpClient.post<ListResponseModel<PersonelUserCoverLetter>>(
      this.newUrlPath + 'getall',
      adminModel
    );
  }

  getDeletedAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserCoverLetter>> {
    return this.httpClient.post<ListResponseModel<PersonelUserCoverLetter>>(
      this.newUrlPath + 'getdeletedall',
      adminModel
    );
  }

  getById(
    adminModel: AdminModel
  ): Observable<SingleResponseModel<PersonelUserCoverLetter>> {
    return this.httpClient.post<SingleResponseModel<PersonelUserCoverLetter>>(
      this.newUrlPath + 'getbyid',
      adminModel
    );
  }

  getAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserCoverLetterDTO>> {
    return this.httpClient.post<ListResponseModel<PersonelUserCoverLetterDTO>>(
      this.newUrlPath + 'getalldto',
      adminModel
    );
  }

  getAllDeletedDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserCoverLetterDTO>> {
    return this.httpClient.post<ListResponseModel<PersonelUserCoverLetterDTO>>(
      this.newUrlPath + 'getalldeleteddto',
      adminModel
    );
  }
}
