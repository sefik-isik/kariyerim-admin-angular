import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { PersonelUserCvEducation } from '../models/personelUserCvEducation';
import { PersonelUserCvEducationDTO } from '../models/personelUserCvEducationDTO';

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

  getAll(id: number): Observable<ListResponseModel<PersonelUserCvEducation>> {
    let path = this.newUrlPath + 'getall?id=' + id;
    return this.httpClient.get<ListResponseModel<PersonelUserCvEducation>>(
      path
    );
  }

  getDeletedAll(): Observable<ListResponseModel<PersonelUserCvEducation>> {
    let path = this.newUrlPath + 'getdeletedall';
    return this.httpClient.get<ListResponseModel<PersonelUserCvEducation>>(
      path
    );
  }

  getById(
    id: number
  ): Observable<SingleResponseModel<PersonelUserCvEducation>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<PersonelUserCvEducation>>(
      path
    );
  }

  getAllDTO(
    id: number
  ): Observable<ListResponseModel<PersonelUserCvEducationDTO>> {
    let path = this.newUrlPath + 'getalldto?id=' + id;
    return this.httpClient.get<ListResponseModel<PersonelUserCvEducationDTO>>(
      path
    );
  }

  getAllDeletedDTO(
    id: number
  ): Observable<ListResponseModel<PersonelUserCvEducationDTO>> {
    let path = this.newUrlPath + 'getalldeleteddto?id=' + id;
    return this.httpClient.get<ListResponseModel<PersonelUserCvEducationDTO>>(
      path
    );
  }
}
