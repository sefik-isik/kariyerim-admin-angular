import { ApiUrl } from '../models/concrete/apiUrl';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '../models/dto/userDTO';
import { ResponseModel } from '../models/response/responseModel';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { AdminModel } from '../models/auth/adminModel';
import { AllUserByPageDTO } from '../models/pageModel/allUserByPageDTO';
import { PageModel } from '../models/base/pageModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  newUrlPath: string = ApiUrl + 'Users/';

  constructor(private httpClient: HttpClient) {}
  update(user: UserDTO): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      user
    );
  }

  delete(user: UserDTO): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      user
    );
  }

  terminate(user: UserDTO): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      user
    );
  }

  getById(adminModel: AdminModel): Observable<SingleResponseModel<UserDTO>> {
    return this.httpClient.post<SingleResponseModel<UserDTO>>(
      this.newUrlPath + 'getbyiddto',
      adminModel
    );
  }

  getAllDTO(adminModel: AdminModel): Observable<ListResponseModel<UserDTO>> {
    return this.httpClient.post<ListResponseModel<UserDTO>>(
      this.newUrlPath + 'getalldto',
      adminModel
    );
  }

  getDeletedAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<UserDTO>> {
    return this.httpClient.post<ListResponseModel<UserDTO>>(
      this.newUrlPath + 'getdeletedalldto',
      adminModel
    );
  }

  getAllByPage(
    pageModel: PageModel
  ): Observable<SingleResponseModel<AllUserByPageDTO>> {
    let path = this.newUrlPath + 'getallbypage';
    return this.httpClient.get<SingleResponseModel<AllUserByPageDTO>>(path, {
      params: new HttpParams()
        .set('pageIndex', pageModel.pageIndex.toString())
        .set('pageSize', pageModel.pageSize.toString())
        .set('sortColumn', pageModel.sortColumn)
        .set('sortOrder', pageModel.sortOrder),
    });
  }

  getAllCompanyUserDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<UserDTO>> {
    return this.httpClient.post<ListResponseModel<UserDTO>>(
      this.newUrlPath + 'getallcompanyuserdto',
      adminModel
    );
  }

  getAllPersonelUserDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<UserDTO>> {
    return this.httpClient.post<ListResponseModel<UserDTO>>(
      this.newUrlPath + 'getallpersoneluserdto',
      adminModel
    );
  }
}
