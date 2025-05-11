import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/apiUrl';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { ResponseModel } from '../models/responseModel';
import { PersonelUserFile } from '../models/personelUserFile';
import { Observable } from 'rxjs';
import { AdminModel } from '../models/adminModel';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { PersonelUserFileDTO } from '../models/personelUserFileDTO';

@Injectable({
  providedIn: 'root',
})
export class PersonelUserFileService {
  newUrlPath: string = ApiUrl + 'PersonelUserFiles/';

  constructor(private httpClient: HttpClient) {}

  add(personelUserFile: PersonelUserFile): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      personelUserFile
    );
  }

  update(personelUserFile: PersonelUserFile): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      personelUserFile
    );
  }

  delete(personelUserFile: PersonelUserFile): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      personelUserFile
    );
  }

  getAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserFile>> {
    return this.httpClient.post<ListResponseModel<PersonelUserFile>>(
      this.newUrlPath + 'getall',
      adminModel
    );
  }

  getDeletedAll(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserFile>> {
    return this.httpClient.post<ListResponseModel<PersonelUserFile>>(
      this.newUrlPath + 'getdeletedall',
      adminModel
    );
  }

  getById(
    adminModel: AdminModel
  ): Observable<SingleResponseModel<PersonelUserFile>> {
    return this.httpClient.post<SingleResponseModel<PersonelUserFile>>(
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

  deleteFile(personelUserFile: PersonelUserFile): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'deletefile',
      personelUserFile
    );
  }

  getAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserFileDTO>> {
    return this.httpClient.post<ListResponseModel<PersonelUserFileDTO>>(
      this.newUrlPath + 'getalldto',
      adminModel
    );
  }

  getAllDeletedDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserFileDTO>> {
    return this.httpClient.post<ListResponseModel<PersonelUserFileDTO>>(
      this.newUrlPath + 'getalldeleteddto',
      adminModel
    );
  }
}
