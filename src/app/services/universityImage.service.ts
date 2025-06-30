import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response/responseModel';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { AdminModel } from '../models/auth/adminModel';
import { UniversityImage } from '../models/component/universityImage';

@Injectable({
  providedIn: 'root',
})
export class UniversityImageService {
  newUrlPath: string = ApiUrl + 'UniversityImages/';

  constructor(private httpClient: HttpClient) {}

  add(universityImage: UniversityImage): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      universityImage
    );
  }

  update(universityImage: UniversityImage): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      universityImage
    );
  }

  delete(universityImage: UniversityImage): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      universityImage
    );
  }

  terminate(universityImage: UniversityImage): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      universityImage
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

  deleteImage(personelUserImage: UniversityImage): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'deleteimage',
      personelUserImage
    );
  }

  getAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<UniversityImage>> {
    return this.httpClient.post<ListResponseModel<UniversityImage>>(
      this.newUrlPath + 'getall',
      adminModel
    );
  }

  getDeletedAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<UniversityImage>> {
    return this.httpClient.post<ListResponseModel<UniversityImage>>(
      this.newUrlPath + 'getdeletedall',
      adminModel
    );
  }

  getById(
    adminModel: AdminModel
  ): Observable<SingleResponseModel<UniversityImage>> {
    return this.httpClient.post<SingleResponseModel<UniversityImage>>(
      this.newUrlPath + 'getbyid',
      adminModel
    );
  }
}
