import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response/responseModel';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { PersonelUserCoverLetter } from '../models/component/personelUserCoverLetter';
import { AdminModel } from '../models/auth/adminModel';
import { PersonelUserCoverLetterDTO } from '../models/dto/personelUserCoverLetterDTO';

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

  terminate(
    personelUserCoverLetter: PersonelUserCoverLetter
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
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

  getDeletedAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserCoverLetterDTO>> {
    return this.httpClient.post<ListResponseModel<PersonelUserCoverLetterDTO>>(
      this.newUrlPath + 'getdeletedalldto',
      adminModel
    );
  }
}
