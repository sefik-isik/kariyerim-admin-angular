import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminModel } from '../models/auth/adminModel';
import { CompanyUserAdvert } from '../models/component/companyUserAdvert';
import { ApiUrl } from '../models/concrete/apiUrl';
import { CompanyUserAdvertDTO } from '../models/dto/companyUserAdvertDTO';
import { ListResponseModel } from '../models/response/listResponseModel';
import { ResponseModel } from '../models/response/responseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { PageModel } from '../models/base/pageModel';

@Injectable({
  providedIn: 'root',
})
export class CompanyUserAdvertService {
  newUrlPath: string = ApiUrl + 'CompanyUserAdverts/';

  constructor(private httpClient: HttpClient) {}

  add(companyUserAdvert: CompanyUserAdvert): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      companyUserAdvert
    );
  }

  update(companyUserAdvert: CompanyUserAdvert): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      companyUserAdvert
    );
  }

  delete(companyUserAdvert: CompanyUserAdvert): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      companyUserAdvert
    );
  }

  uploadImage(formData: FormData, id: string): Observable<HttpEvent<File>> {
    return this.httpClient.post<File>(
      this.newUrlPath + 'uploadimage?id=' + id,
      formData,
      {
        reportProgress: true,
        observe: 'events',
      }
    );
  }

  deleteImage(companyUserAdvert: CompanyUserAdvert): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'deleteimage',
      companyUserAdvert
    );
  }

  terminate(companyUserAdvert: CompanyUserAdvert): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      companyUserAdvert
    );
  }

  getAll(): Observable<ListResponseModel<CompanyUserAdvert>> {
    return this.httpClient.get<ListResponseModel<CompanyUserAdvert>>(
      this.newUrlPath + 'getall'
    );
  }

  getDeletedAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<CompanyUserAdvert>> {
    return this.httpClient.post<ListResponseModel<CompanyUserAdvert>>(
      this.newUrlPath + 'getdeletedall',
      adminModel
    );
  }

  getAllByFilterListPage(
    pageModel: PageModel
  ): Observable<SingleResponseModel<CompanyUserAdvert>> {
    return this.httpClient.post<SingleResponseModel<CompanyUserAdvert>>(
      this.newUrlPath + 'getallbypage',
      pageModel
    );
  }

  getById(id: string): Observable<SingleResponseModel<CompanyUserAdvert>> {
    return this.httpClient.get<SingleResponseModel<CompanyUserAdvert>>(
      this.newUrlPath + 'getbyid?id=' + id
    );
  }

  getAllDTO(): Observable<ListResponseModel<CompanyUserAdvertDTO>> {
    return this.httpClient.get<ListResponseModel<CompanyUserAdvertDTO>>(
      this.newUrlPath + 'getalldto'
    );
  }

  getDeletedAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<CompanyUserAdvertDTO>> {
    return this.httpClient.post<ListResponseModel<CompanyUserAdvertDTO>>(
      this.newUrlPath + 'getdeletedalldto',
      adminModel
    );
  }
}
