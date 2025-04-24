import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { CompanyUserFile } from '../models/companyUserFile';
import { ResponseModel } from '../models/responseModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { CompanyUserFileDTO } from '../models/companyUserFileDTO';

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

  getAll(id: number): Observable<ListResponseModel<CompanyUserFile>> {
    let path = this.newUrlPath + 'getall?id=' + id;
    return this.httpClient.get<ListResponseModel<CompanyUserFile>>(path);
  }

  getById(id: number): Observable<SingleResponseModel<CompanyUserFile>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<CompanyUserFile>>(path);
  }

  getAllDTO(id: number): Observable<ListResponseModel<CompanyUserFileDTO>> {
    let path = this.newUrlPath + 'getalldto?id=' + id;
    return this.httpClient.get<ListResponseModel<CompanyUserFileDTO>>(path);
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
}
