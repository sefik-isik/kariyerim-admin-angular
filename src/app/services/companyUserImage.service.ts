import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response/responseModel';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { CompanyUserImage } from '../models/component/companyUserImage';
import { CompanyUserImageDTO } from '../models/dto/companyUserImageDTO';
import { AdminModel } from '../models/auth/adminModel';

@Injectable({
  providedIn: 'root',
})
export class CompanyUserImageService {
  newUrlPath: string = ApiUrl + 'CompanyUserImages/';

  constructor(private httpClient: HttpClient) {}

  add(companyUserImage: CompanyUserImage): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      companyUserImage
    );
  }

  update(companyUserImage: CompanyUserImage): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      companyUserImage
    );
  }

  delete(companyUserImage: CompanyUserImage): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      companyUserImage
    );
  }

  terminate(companyUserImage: CompanyUserImage): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      companyUserImage
    );
  }

  getAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<CompanyUserImage>> {
    return this.httpClient.post<ListResponseModel<CompanyUserImage>>(
      this.newUrlPath + 'getall',
      adminModel
    );
  }

  getDeletedAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<CompanyUserImage>> {
    return this.httpClient.post<ListResponseModel<CompanyUserImage>>(
      this.newUrlPath + 'getdeletedall',
      adminModel
    );
  }

  getById(
    adminModel: AdminModel
  ): Observable<SingleResponseModel<CompanyUserImage>> {
    return this.httpClient.post<SingleResponseModel<CompanyUserImage>>(
      this.newUrlPath + 'getbyid',
      adminModel
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

  deleteImage(companyUserImage: CompanyUserImage): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'deleteimage',
      companyUserImage
    );
  }

  getAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<CompanyUserImageDTO>> {
    return this.httpClient.post<ListResponseModel<CompanyUserImageDTO>>(
      this.newUrlPath + 'getalldto',
      adminModel
    );
  }

  getDeletedAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<CompanyUserImageDTO>> {
    return this.httpClient.post<ListResponseModel<CompanyUserImageDTO>>(
      this.newUrlPath + 'getdeletedalldto',
      adminModel
    );
  }
}
