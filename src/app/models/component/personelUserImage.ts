import { BasePersonelUserModel } from '../base/basePersonelUserModel';

export interface PersonelUserImage extends BasePersonelUserModel {
  imageName: string;
  imageOwnName: string;
  imagePath: string;
  isProfilImage: boolean;
}
