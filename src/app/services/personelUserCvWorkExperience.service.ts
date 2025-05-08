import { PersonelUserCvWorkExperienceDTO } from './../models/personelUserCvWorkExperienceDTO';
import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { PersonelUserCvWorkExperience } from '../models/personelUserCvWorkExperience';
import { AdminModel } from '../models/adminModel';

@Injectable({
  providedIn: 'root',
})
export class PersonelUserCvWorkExperienceService {
  newUrlPath: string = ApiUrl + 'PersonelUserCvWorkExperiences/';

  constructor(private httpClient: HttpClient) {}

  add(
    personelUserCvWorkExperience: PersonelUserCvWorkExperience
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      personelUserCvWorkExperience
    );
  }

  update(
    personelUserCvWorkExperience: PersonelUserCvWorkExperience
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      personelUserCvWorkExperience
    );
  }

  delete(
    personelUserCvWorkExperience: PersonelUserCvWorkExperience
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      personelUserCvWorkExperience
    );
  }

  getAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserCvWorkExperience>> {
    return this.httpClient.post<
      ListResponseModel<PersonelUserCvWorkExperience>
    >(this.newUrlPath + 'getall', adminModel);
  }

  getDeletedAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserCvWorkExperience>> {
    return this.httpClient.post<
      ListResponseModel<PersonelUserCvWorkExperience>
    >(this.newUrlPath + 'getdeletedall', adminModel);
  }

  getById(
    id: number
  ): Observable<SingleResponseModel<PersonelUserCvWorkExperience>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<
      SingleResponseModel<PersonelUserCvWorkExperience>
    >(path);
  }

  getAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserCvWorkExperienceDTO>> {
    return this.httpClient.post<
      ListResponseModel<PersonelUserCvWorkExperienceDTO>
    >(this.newUrlPath + 'getalldto', adminModel);
  }

  getAllDeletedDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserCvWorkExperienceDTO>> {
    return this.httpClient.post<
      ListResponseModel<PersonelUserCvWorkExperienceDTO>
    >(this.newUrlPath + 'getalldeleteddto', adminModel);
  }
}
