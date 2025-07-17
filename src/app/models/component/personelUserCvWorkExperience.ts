import { BasePersonelUserCvModel } from '../base/basePersonelUserCvModel';

export interface PersonelUserCvWorkExperience extends BasePersonelUserCvModel {
  companyName: string;
  working: boolean;
  startDate: string;
  endDate: string;
  companySectorId: string;
  departmentId: string;
  departmentName: string;
  foundJobInHere: boolean;
  workingMethodId: string;
  countryId: string;
  cityId: string;
  cityName: string;
  regionId: string;
  detail: string;
  positionId: string;
  positionLevelId: string;
}
