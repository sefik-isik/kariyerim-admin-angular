import { BasePersonelUserCvDTOModel } from './basePersonelUserCvDTOModel';

export interface PersonelUserCvWorkExperienceDTO
  extends BasePersonelUserCvDTOModel {
  position: string;
  companyName: string;
  working: boolean;
  startDate: string;
  endDate: string;
  companySectorId: number;
  companySectorName: string;
  departmentId: number;
  departmentName: string;
  foundJobInHere: boolean;
  workingMethodId: number;
  workingMethodName: string;
  countryId: number;
  countryName: string;
  cityId: number;
  cityName: string;
  regionId: number;
  regionName: string;
  detail: string;
}
