import { BasePersonelUserDTOModel } from '../base/basePersonelUserDTOModel';

export interface PersonelUserImageDTO extends BasePersonelUserDTOModel {
  imageName: string;
  imageOwnName: string;
  imagePath: string;
  isProfilImage: boolean;
}
