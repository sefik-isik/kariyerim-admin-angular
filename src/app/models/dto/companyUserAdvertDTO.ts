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
  rxperienceName: string;
  departmentId: string;
  departmentName: string;
  licenseDegreeId: string;
  licenseDegreeName: string;
}
