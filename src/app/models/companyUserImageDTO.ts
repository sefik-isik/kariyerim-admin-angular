import { BaseCompanyUserDTOModel } from "./baseCompanyUserDTOModel";

export interface CompanyUserImageDTO extends BaseCompanyUserDTOModel {
  imageName: string;
  imagePath: string;
}
