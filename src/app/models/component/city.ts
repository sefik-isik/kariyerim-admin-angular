import { BaseModel } from '../base/baseModel';

export interface City extends BaseModel {
  countryId: string;
  cityName: string;
  cityCode: string;
  createdDate: string;
  updatedDate: string;
  deletedDate: string;
}
