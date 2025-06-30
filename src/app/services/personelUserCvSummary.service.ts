import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response/responseModel';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { PersonelUserCvSummary } from '../models/component/personelUserCvSummary';
import { AdminModel } from '../models/auth/adminModel';
import { PersonelUserCvSummaryDTO } from '../models/dto/personelUserCvSummaryDTO';

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

  terminate(
    personelUserCvSummary: PersonelUserCvSummary
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      personelUserCvSummary
    );
  }

  getAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserCvSummary>> {
    return this.httpClient.post<ListResponseModel<PersonelUserCvSummary>>(
      this.newUrlPath + 'getall',
      adminModel
    );
  }

  getDeletedAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserCvSummary>> {
    return this.httpClient.post<ListResponseModel<PersonelUserCvSummary>>(
      this.newUrlPath + 'getdeletedall',
      adminModel
    );
  }

  getById(
    adminModel: AdminModel
  ): Observable<SingleResponseModel<PersonelUserCvSummary>> {
    return this.httpClient.post<SingleResponseModel<PersonelUserCvSummary>>(
      this.newUrlPath + 'getbyid',
      adminModel
    );
  }

  getAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserCvSummaryDTO>> {
    return this.httpClient.post<ListResponseModel<PersonelUserCvSummaryDTO>>(
      this.newUrlPath + 'getalldto',
      adminModel
    );
  }

  getDeletedAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserCvSummaryDTO>> {
    return this.httpClient.post<ListResponseModel<PersonelUserCvSummaryDTO>>(
      this.newUrlPath + 'getdeletedalldto',
      adminModel
    );
  }
}
