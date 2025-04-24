import { BaseModel } from './baseModel';

export interface City extends BaseModel {
  countryId: number;
  cityName: string;
  createdDate: string;
  updatedDate: string;
  deletedDate: string;
}
