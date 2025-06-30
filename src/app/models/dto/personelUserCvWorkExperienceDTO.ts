import { BasePersonelUserCvDTOModel } from '../base/basePersonelUserCvDTOModel';

export interface PersonelUserCvWorkExperienceDTO
  extends BasePersonelUserCvDTOModel {
  position: string;
  companyName: string;
  working: boolean;
  startDate: string;
  endDate: string;
  companySectorId: string;
  companySectorName: string;
  departmentId: string;
  departmentName: string;
  workingMethodId: string;
  workingMethodName: string;
  countryId: string;
  countryName: string;
  cityId: string;
  cityName: string;
  regionId: string;
  regionName: string;
  foundJobInHere: boolean;
  detail: string;
}
