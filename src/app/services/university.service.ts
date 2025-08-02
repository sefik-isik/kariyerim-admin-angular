import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response/responseModel';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { University } from '../models/component/university';
import { UniversityDTO } from '../models/dto/universityDTO';
import { PageModel } from '../models/base/pageModel';
import { UniversityByPageDTO } from '../models/pageModel/universityByPageDTO';

@Injectable({
  providedIn: 'root',
})
export class UniversityService {
  newUrlPath: string = ApiUrl + 'Universities/';

  constructor(private httpClient: HttpClient) {}

  add(university: University): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      university
    );
  }

  update(university: University): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      university
    );
  }

  delete(university: University): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      university
    );
  }

  terminate(university: University): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      university
    );
  }

  getAll(): Observable<ListResponseModel<University>> {
    let path = this.newUrlPath + 'getall';
    return this.httpClient.get<ListResponseModel<University>>(path);
  }

  getDeletedAll(): Observable<ListResponseModel<University>> {
    let path = this.newUrlPath + 'getdeletedall';
    return this.httpClient.get<ListResponseModel<University>>(path);
  }

  getAllByPage(
    pageModel: PageModel
  ): Observable<SingleResponseModel<UniversityByPageDTO>> {
    let path = this.newUrlPath + 'getallbypage';
    return this.httpClient.get<SingleResponseModel<UniversityByPageDTO>>(path, {
      params: new HttpParams()
        .set('pageIndex', pageModel.pageIndex.toString())
        .set('pageSize', pageModel.pageSize.toString())
        .set('sortColumn', pageModel.sortColumn)
        .set('sortOrder', pageModel.sortOrder),
    });
  }

  getById(id: string): Observable<SingleResponseModel<University>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<University>>(path);
  }

  getAllDTO(): Observable<ListResponseModel<UniversityDTO>> {
    let path = this.newUrlPath + 'getalldto';
    return this.httpClient.get<ListResponseModel<UniversityDTO>>(path);
  }

  getDeletedAllDTO(): Observable<ListResponseModel<UniversityDTO>> {
    let path = this.newUrlPath + 'getdeletedalldto';
    return this.httpClient.get<ListResponseModel<UniversityDTO>>(path);
  }
}
