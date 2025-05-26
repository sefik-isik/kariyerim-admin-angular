import { BasePersonelUserDTOModel } from './basePersonelUserDTOModel';

export interface PersonelUserImageDTO extends BasePersonelUserDTOModel {
  imageOwnName: string;
  imageName: string;
  imagePath: string;
}
