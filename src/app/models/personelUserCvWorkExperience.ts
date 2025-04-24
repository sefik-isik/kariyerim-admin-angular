import { BasePersonelUserCvModel } from './basePersonelUserCvModel';

export interface PersonelUserCvWorkExperience extends BasePersonelUserCvModel {
  position: string;
  companyName: string;
  working: boolean;
  startDate: string;
  endDate: string;
  companySectorId: number;
  departmentId: number;
  departmentName: string;
  foundJobInHere: boolean;
  workingMethodId: boolean;
  countryId: number;
  countryName: string;
  cityId: number;
  cityName: string;
  regionId: number;
  regionName: string;
  detail: string;
}
