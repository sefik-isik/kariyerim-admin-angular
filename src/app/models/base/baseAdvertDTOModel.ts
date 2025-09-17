import { BaseModel } from './baseModel';

export interface BaseAdvertDTOModel extends BaseModel {
  companyUserId: string;
  companyUserName: string;
  personelUserId: string;
  personelUserMail: string;
  personelUserFirstName: string;
  personelUserLastName: string;
  personelUserPhoneNumber: string;
  personelUserTitle: string;
  personelUserGender: boolean;
  personelUserDateOfBirth: string;
  personelUserNationalStatus: string;
  personelUserMilitaryStatus: string;
  personelUserRetirementStatus: string;
  personelUserCvId: string;
  personelUserCvName: string;
  personelUserImagePath: string;
  personelUserImageName: string;
  personelUserImageOwnName: string;
  companyUserImagePath: string;
  companyUserImageName: string;
  companyUserImageOwnName: string;
}
