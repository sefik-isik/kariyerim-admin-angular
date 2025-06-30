import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response/responseModel';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { PersonelUserCvEducation } from '../models/component/personelUserCvEducation';
import { PersonelUserCvEducationDTO } from '../models/dto/personelUserCvEducationDTO';
import { AdminModel } from '../models/auth/adminModel';

@Injectable({
  providedIn: 'root',
})
export class PersonelUserCvEducationService {
  newUrlPath: string = ApiUrl + 'PersonelUserCvEducations/';

  constructor(private httpClient: HttpClient) {}

  add(
    personelUserCvEducation: PersonelUserCvEducation
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      personelUserCvEducation
    );
  }

  update(
    personelUserCvEducation: PersonelUserCvEducation
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      personelUserCvEducation
    );
  }

  delete(
    personelUserCvEducation: PersonelUserCvEducation
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      personelUserCvEducation
    );
  }

  terminate(
    personelUserCvEducation: PersonelUserCvEducation
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      personelUserCvEducation
    );
  }

  getAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserCvEducation>> {
    return this.httpClient.post<ListResponseModel<PersonelUserCvEducation>>(
      this.newUrlPath + 'getall',
      adminModel
    );
  }

  getDeletedAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserCvEducation>> {
    return this.httpClient.post<ListResponseModel<PersonelUserCvEducation>>(
      this.newUrlPath + 'getdeletedall',
      adminModel
    );
  }

  getById(
    adminModel: AdminModel
  ): Observable<SingleResponseModel<PersonelUserCvEducation>> {
    return this.httpClient.post<SingleResponseModel<PersonelUserCvEducation>>(
      this.newUrlPath + 'getbyid',
      adminModel
    );
  }

  getAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserCvEducationDTO>> {
    return this.httpClient.post<ListResponseModel<PersonelUserCvEducationDTO>>(
      this.newUrlPath + 'getalldto',
      adminModel
    );
  }

  getDeletedAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserCvEducationDTO>> {
    return this.httpClient.post<ListResponseModel<PersonelUserCvEducationDTO>>(
      this.newUrlPath + 'getdeletedalldto',
      adminModel
    );
  }
}
