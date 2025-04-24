import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { PersonelUserImage } from '../models/personelUserImage';

@Injectable({
  providedIn: 'root',
})
export class PersonelUserImageService {
  newUrlPath: string = ApiUrl + 'PersonelUserImages/';

  constructor(private httpClient: HttpClient) {}

  add(personelUserImage: PersonelUserImage): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      personelUserImage
    );
  }

  update(personelUserImage: PersonelUserImage): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      personelUserImage
    );
  }

  delete(personelUserImage: PersonelUserImage): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      personelUserImage
    );
  }

  getAll(): Observable<ListResponseModel<PersonelUserImage>> {
    let path = this.newUrlPath + 'getall';
    return this.httpClient.get<ListResponseModel<PersonelUserImage>>(path);
  }

  getById(id: number): Observable<SingleResponseModel<PersonelUserImage>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<PersonelUserImage>>(path);
  }
}
