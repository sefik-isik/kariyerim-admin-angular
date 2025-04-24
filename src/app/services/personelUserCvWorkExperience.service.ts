import { PersonelUserCvWorkExperienceDTO } from './../models/personelUserCvWorkExperienceDTO';
import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { PersonelUserCvWorkExperience } from '../models/personelUserCvWorkExperience';

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

  getAll(): Observable<ListResponseModel<PersonelUserCvWorkExperience>> {
    let path = this.newUrlPath + 'getall';
    return this.httpClient.get<ListResponseModel<PersonelUserCvWorkExperience>>(
      path
    );
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
    id: number
  ): Observable<ListResponseModel<PersonelUserCvWorkExperienceDTO>> {
    let path = this.newUrlPath + 'getalldto?id=' + id;
    return this.httpClient.get<
      ListResponseModel<PersonelUserCvWorkExperienceDTO>
    >(path);
  }
}
