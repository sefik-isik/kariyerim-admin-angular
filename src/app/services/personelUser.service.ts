import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response/responseModel';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { PersonelUser } from '../models/component/personelUser';
import { PersonelUserDTO } from '../models/dto/personelUserDTO';
import { AdminModel } from '../models/auth/adminModel';
import { PageModel } from '../models/base/pageModel';
import { PersonelUserByPageDTO } from '../models/pageModel/personelUserByPageDTO';

@Injectable({
  providedIn: 'root',
})
export class PersonelUserService {
  newUrlPath: string = ApiUrl + 'PersonelUsers/';

  constructor(private httpClient: HttpClient) {}

  add(personelUser: PersonelUser): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      personelUser
    );
  }

  update(personelUser: PersonelUser): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      personelUser
    );
  }

  delete(personelUser: PersonelUser): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      personelUser
    );
  }

  terminate(personelUser: PersonelUser): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      personelUser
    );
  }

  getAll(adminModel: AdminModel): Observable<ListResponseModel<PersonelUser>> {
    return this.httpClient.post<ListResponseModel<PersonelUser>>(
      this.newUrlPath + 'getall',
      adminModel
    );
  }

  getDeletedAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUser>> {
    return this.httpClient.post<ListResponseModel<PersonelUser>>(
      this.newUrlPath + 'getdeletedall',
      adminModel
    );
  }

  getAllByPage(
    pageModel: PageModel
  ): Observable<SingleResponseModel<PersonelUserByPageDTO>> {
    let path = this.newUrlPath + 'getallbypage';
    return this.httpClient.get<SingleResponseModel<PersonelUserByPageDTO>>(
      path,
      {
        params: new HttpParams()
          .set('pageIndex', pageModel.pageIndex.toString())
          .set('pageSize', pageModel.pageSize.toString())
          .set('sortColumn', pageModel.sortColumn)
          .set('sortOrder', pageModel.sortOrder),
      }
    );
  }

  getById(
    adminModel: AdminModel
  ): Observable<SingleResponseModel<PersonelUser>> {
    return this.httpClient.post<SingleResponseModel<PersonelUser>>(
      this.newUrlPath + 'getbyid',
      adminModel
    );
  }

  getAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserDTO>> {
    return this.httpClient.post<ListResponseModel<PersonelUserDTO>>(
      this.newUrlPath + 'getalldto',
      adminModel
    );
  }

  getDeletedAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserDTO>> {
    return this.httpClient.post<ListResponseModel<PersonelUserDTO>>(
      this.newUrlPath + 'getdeletedalldto',
      adminModel
    );
  }
}
