import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { CompanyUserImage } from '../models/companyUserImage';
import { CompanyUserImageDTO } from '../models/companyUserImageDTO';

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

  getAll(id: number): Observable<ListResponseModel<CompanyUserImage>> {
    let path = this.newUrlPath + 'getall?id=' + id;
    return this.httpClient.get<ListResponseModel<CompanyUserImage>>(path);
  }

  getById(id: number): Observable<SingleResponseModel<CompanyUserImage>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<CompanyUserImage>>(path);
  }

  getAllDTO(id: number): Observable<ListResponseModel<CompanyUserImageDTO>> {
    let path = this.newUrlPath + 'getalldto?id=' + id;
    return this.httpClient.get<ListResponseModel<CompanyUserImageDTO>>(path);
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
}
