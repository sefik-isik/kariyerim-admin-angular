import { ApiUrl } from './../models/apiUrl';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { UserDTO } from '../models/userDTO';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  newUrlPath: string = ApiUrl + 'Users/';

  constructor(private httpClient: HttpClient) {}

  getAllDTO(id: number): Observable<ListResponseModel<UserDTO>> {
    let path = this.newUrlPath + 'getalldto?id=' + id;
    return this.httpClient.get<ListResponseModel<UserDTO>>(path);
  }
}
