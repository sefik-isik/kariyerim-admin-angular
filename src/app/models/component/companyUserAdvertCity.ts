import { BaseCompanyUserAdvertModel } from '../base/baseCompanyUserAdvertModel';

export interface CompanyUserAdvertCity extends BaseCompanyUserAdvertModel {
  advertName: string;
  advertImageName: string;
  advertImagePath: string;
  advertImageOwnName: string;
  workAreaId: string;
  workingMethodId: string;
  experienceId: string;
  departmentId: string;
  licenseDegreeId: string;
}
