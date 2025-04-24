import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { PersonelUserCv } from '../models/personelUserCv';
import { PersonelUserCvDTO } from '../models/personelUserCvDTO';

@Injectable({
  providedIn: 'root',
})
export class PersonelUserCvService {
  newUrlPath: string = ApiUrl + 'PersonelUserCvs/';

  constructor(private httpClient: HttpClient) {}

  add(personelUserCv: PersonelUserCv): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      personelUserCv
    );
  }

  update(personelUserCv: PersonelUserCv): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      personelUserCv
    );
  }

  delete(personelUserCv: PersonelUserCv): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      personelUserCv
    );
  }

  getAll(id: number): Observable<ListResponseModel<PersonelUserCv>> {
    let path = this.newUrlPath + 'getall?id=' + id;
    return this.httpClient.get<ListResponseModel<PersonelUserCv>>(path);
  }

  getById(id: number): Observable<SingleResponseModel<PersonelUserCv>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<PersonelUserCv>>(path);
  }

  getAllDTO(id: number): Observable<ListResponseModel<PersonelUserCvDTO>> {
    let path = this.newUrlPath + 'getalldto?id=' + id;
    return this.httpClient.get<ListResponseModel<PersonelUserCvDTO>>(path);
  }
}
