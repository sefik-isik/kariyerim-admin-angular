import { BasePersonelUserModel } from './basePersonelUserModel';

export interface PersonelUserImage extends BasePersonelUserModel {
  imageName: string;
  imagePath: string;
}
