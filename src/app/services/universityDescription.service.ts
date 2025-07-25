import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response/responseModel';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { UniversityDescription } from '../models/component/universityDescription';
import { UniversityDescriptionDTO } from '../models/dto/universityDescriptionDTO';

@Injectable({
  providedIn: 'root',
})
export class UniversityDescriptionService {
  newUrlPath: string = ApiUrl + 'UniversityDescriptions/';

  constructor(private httpClient: HttpClient) {}

  add(sectorDescription: UniversityDescription): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      sectorDescription
    );
  }

  update(sectorDescription: UniversityDescription): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      sectorDescription
    );
  }

  delete(sectorDescription: UniversityDescription): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      sectorDescription
    );
  }

  terminate(
    sectorDescription: UniversityDescription
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      sectorDescription
    );
  }

  getAll(): Observable<ListResponseModel<UniversityDescription>> {
    let path = this.newUrlPath + 'getall';
    return this.httpClient.get<ListResponseModel<UniversityDescription>>(path);
  }

  getDeletedAll(): Observable<ListResponseModel<UniversityDescription>> {
    let path = this.newUrlPath + 'getdeletedall';
    return this.httpClient.get<ListResponseModel<UniversityDescription>>(path);
  }

  getById(id: string): Observable<SingleResponseModel<UniversityDescription>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<UniversityDescription>>(
      path
    );
  }

  getAllDTO(): Observable<ListResponseModel<UniversityDescriptionDTO>> {
    let path = this.newUrlPath + 'getalldto';
    return this.httpClient.get<ListResponseModel<UniversityDescriptionDTO>>(
      path
    );
  }

  getDeletedAllDTO(): Observable<ListResponseModel<UniversityDescriptionDTO>> {
    let path = this.newUrlPath + 'getdeletedalldto';
    return this.httpClient.get<ListResponseModel<UniversityDescriptionDTO>>(
      path
    );
  }
}
