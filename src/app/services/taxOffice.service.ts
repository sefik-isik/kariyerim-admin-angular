import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response/responseModel';
import { ListResponseModel } from '../models/response/listResponseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';
import { TaxOffice } from '../models/component/taxOffice';
import { TaxOfficeDTO } from '../models/dto/taxOfficeDTO';
import { PageModel } from '../models/base/pageModel';
import { TaxOfficeByPageDTO } from '../models/pageModel/taxOfficeByPageDTO';

@Injectable({
  providedIn: 'root',
})
export class TaxOfficeService {
  newUrlPath: string = ApiUrl + 'TaxOffices/';

  constructor(private httpClient: HttpClient) {}

  add(taxOffice: TaxOffice): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'add',
      taxOffice
    );
  }

  update(taxOffice: TaxOffice): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'update',
      taxOffice
    );
  }

  delete(taxOffice: TaxOffice): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'delete',
      taxOffice
    );
  }

  terminate(taxOffice: TaxOffice): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.newUrlPath + 'terminate',
      taxOffice
    );
  }

  getAll(): Observable<ListResponseModel<TaxOffice>> {
    let path = this.newUrlPath + 'getall';
    return this.httpClient.get<ListResponseModel<TaxOffice>>(path);
  }

  getDeletedAll(): Observable<ListResponseModel<TaxOffice>> {
    let path = this.newUrlPath + 'getdeletedall';
    return this.httpClient.get<ListResponseModel<TaxOffice>>(path);
  }

  getAllByPage(
    pageModel: PageModel
  ): Observable<SingleResponseModel<TaxOfficeByPageDTO>> {
    let path = this.newUrlPath + 'getallbypage';
    return this.httpClient.get<SingleResponseModel<TaxOfficeByPageDTO>>(path, {
      params: new HttpParams()
        .set('pageIndex', pageModel.pageIndex.toString())
        .set('pageSize', pageModel.pageSize.toString())
        .set('sortColumn', pageModel.sortColumn)
        .set('sortOrder', pageModel.sortOrder),
    });
  }

  getById(id: string): Observable<SingleResponseModel<TaxOffice>> {
    let path = this.newUrlPath + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<TaxOffice>>(path);
  }

  getAllDTO(): Observable<ListResponseModel<TaxOfficeDTO>> {
    let path = this.newUrlPath + 'getalldto';
    return this.httpClient.get<ListResponseModel<TaxOfficeDTO>>(path);
  }

  getDeletedAllDTO(): Observable<ListResponseModel<TaxOfficeDTO>> {
    let path = this.newUrlPath + 'getdeletedalldto';
    return this.httpClient.get<ListResponseModel<TaxOfficeDTO>>(path);
  }
}
