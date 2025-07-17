import { BaseCompanyUserDTOModel } from '../base/baseCompanyUserDTOModel';

export interface CompanyUserDepartmentDTO extends BaseCompanyUserDTOModel {
  departmentId: string;
  departmentName: string;
}
