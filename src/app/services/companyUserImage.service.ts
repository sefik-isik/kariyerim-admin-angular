import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { CompanyUserImage } from '../models/companyUserImage';
import { CompanyUserImageDTO } from '../models/companyUserImageDTO';
import { AdminModel } from '../models/adminModel';

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

  uploadImage(formData: FormData, id: number): Observable<HttpEvent<File>> {
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

  getAllDeletedDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<CompanyUserImageDTO>> {
    return this.httpClient.post<ListResponseModel<CompanyUserImageDTO>>(
      this.newUrlPath + 'getalldeleteddto',
      adminModel
    );
  }
}
