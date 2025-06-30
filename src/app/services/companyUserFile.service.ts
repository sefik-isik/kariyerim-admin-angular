import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { CompanyUserFile } from '../models/component/companyUserFile';
import { ResponseModel } from '../models/response/responseModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { CompanyUserFileDTO } from '../models/dto/companyUserFileDTO';
import { AdminModel } from '../models/auth/adminModel';

@Injectable({
  providedIn: 'root',
})
export class CompanyUserFileService {
  newUrlPath: string = ApiUrl + 'CompanyUserFiles/';

  constructor(private httpClient: HttpClient) {}

  add(companyUserFile: CompanyUserFile): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      companyUserFile
    );
  }

  update(companyUserFile: CompanyUserFile): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      companyUserFile
    );
  }

  delete(companyUserFile: CompanyUserFile): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      companyUserFile
    );
  }

  terminate(companyUserFile: CompanyUserFile): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      companyUserFile
    );
  }

  getAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<CompanyUserFile>> {
    return this.httpClient.post<ListResponseModel<CompanyUserFile>>(
      this.newUrlPath + 'getall',
      adminModel
    );
  }

  getDeletedAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<CompanyUserFile>> {
    return this.httpClient.post<ListResponseModel<CompanyUserFile>>(
      this.newUrlPath + 'getdeletedall',
      adminModel
    );
  }

  getById(
    adminModel: AdminModel
  ): Observable<SingleResponseModel<CompanyUserFile>> {
    return this.httpClient.post<SingleResponseModel<CompanyUserFile>>(
      this.newUrlPath + 'getbyid',
      adminModel
    );
  }

  uploadFile(formData: FormData, id: string): Observable<HttpEvent<File>> {
    return this.httpClient.post<File>(
      this.newUrlPath + 'uploadfile?id=' + id,
      formData,
      {
        reportProgress: true,
        observe: 'events',
      }
    );
  }

  deleteFile(companyUserFile: CompanyUserFile): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'deletefile',
      companyUserFile
    );
  }

  getAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<CompanyUserFileDTO>> {
    return this.httpClient.post<ListResponseModel<CompanyUserFileDTO>>(
      this.newUrlPath + 'getalldto',
      adminModel
    );
  }

  getDeletedAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<CompanyUserFileDTO>> {
    return this.httpClient.post<ListResponseModel<CompanyUserFileDTO>>(
      this.newUrlPath + 'getdeletedalldto',
      adminModel
    );
  }
}
