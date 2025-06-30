import { PersonelUserCvWorkExperienceDTO } from '../models/dto/personelUserCvWorkExperienceDTO';
import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response/responseModel';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { PersonelUserCvWorkExperience } from '../models/component/personelUserCvWorkExperience';
import { AdminModel } from '../models/auth/adminModel';

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

  terminate(
    personelUserCvWorkExperience: PersonelUserCvWorkExperience
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
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
    adminModel: AdminModel
  ): Observable<SingleResponseModel<PersonelUserCvWorkExperience>> {
    return this.httpClient.post<
      SingleResponseModel<PersonelUserCvWorkExperience>
    >(this.newUrlPath + 'getbyid', adminModel);
  }

  getAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserCvWorkExperienceDTO>> {
    return this.httpClient.post<
      ListResponseModel<PersonelUserCvWorkExperienceDTO>
    >(this.newUrlPath + 'getalldto', adminModel);
  }

  getDeletedAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserCvWorkExperienceDTO>> {
    return this.httpClient.post<
      ListResponseModel<PersonelUserCvWorkExperienceDTO>
    >(this.newUrlPath + 'getdeletedalldto', adminModel);
  }
}
