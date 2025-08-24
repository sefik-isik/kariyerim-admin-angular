import { BaseCompanyUserDTOModel } from '../base/baseCompanyUserDTOModel';

export interface CompanyUserAdvertDTO extends BaseCompanyUserDTOModel {
  advertName: string;
  advertImageName: string;
  advertImagePath: string;
  advertImageOwnName: string;
  workAreaId: string;
  workAreaName: string;
  workingMethodId: string;
  workingMethodName: string;
  experienceId: string;
  experienceName: string;
  departmentId: string;
  departmentName: string;
  licenseDegreeId: string;
  licenseDegreeName: string;
  positionId: string;
  positionName: string;
  positionLevelId: string;
  positionLevelName: string;
  militaryStatus: boolean;
  languageId: string;
  languageName: string;
  languageLevelId: string;
  languageLevelName: string;
  driverLicenceId: string;
  driverLicenceName: string;
  countryId: string;
  countryName: string;
  cityId: string;
  cityName: string;
  regionId: string;
  regionName: string;
  sectorId: string;
  sectorName: string;
}
