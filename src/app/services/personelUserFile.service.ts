import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { PersonelUserFile } from '../models/component/personelUserFile';
import { Observable } from 'rxjs';
import { AdminModel } from '../models/auth/adminModel';
import { ResponseModel } from '../models/response/responseModel';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { PersonelUserFileDTO } from '../models/dto/personelUserFileDTO';

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

  terminate(personelUserFile: PersonelUserFile): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
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

  getDeletedAllDTO(
    adminModel: AdminModel
  ): Observable<ListResponseModel<PersonelUserFileDTO>> {
    return this.httpClient.post<ListResponseModel<PersonelUserFileDTO>>(
      this.newUrlPath + 'getdeletedalldto',
      adminModel
    );
  }
}
