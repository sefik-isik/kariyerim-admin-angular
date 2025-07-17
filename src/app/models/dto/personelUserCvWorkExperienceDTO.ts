import { BasePersonelUserCvDTOModel } from '../base/basePersonelUserCvDTOModel';

export interface PersonelUserCvWorkExperienceDTO
  extends BasePersonelUserCvDTOModel {
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
  positionId: string;
  positionName: string;
  positionLevelId: string;
  positionLevelName: string;
}
