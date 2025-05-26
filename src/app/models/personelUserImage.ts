import { BasePersonelUserModel } from './basePersonelUserModel';

export interface PersonelUserImage extends BasePersonelUserModel {
  imageOwnName: string;
  imageName: string;
  imagePath: string;
}
