import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { CompanyUserFile } from '../models/companyUserFile';
import { ResponseModel } from '../models/responseModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { CompanyUserFileDTO } from '../models/companyUserFileDTO';
import { AdminModel } from '../models/adminModel';

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

  uploadFile(formData: FormData, id: number): Observable<HttpEvent<File>> {
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

  getAllDeletedDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<CompanyUserFileDTO>> {
    return this.httpClient.post<ListResponseModel<CompanyUserFileDTO>>(
      this.newUrlPath + 'getalldeleteddto',
      adminModel
    );
  }
}
