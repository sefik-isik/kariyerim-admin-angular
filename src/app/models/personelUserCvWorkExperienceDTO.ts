import { BasePersonelUserCvDTOModel } from './basePersonelUserCvDTOModel';

export interface PersonelUserCvWorkExperienceDTO
  extends BasePersonelUserCvDTOModel {
  position: string;
  companyName: string;
  working: boolean;
  startDate: string;
  endDate: string;
  companySectorName: string;
  departmentName: string;
  workingMethodName: string;
  countryname: string;
  cityName: string;
  regionName: string;
  detail: string;
}
