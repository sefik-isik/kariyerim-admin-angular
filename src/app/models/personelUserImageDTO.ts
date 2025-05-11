import { BasePersonelUserDTOModel } from './basePersonelUserDTOModel';

export interface PersonelUserImageDTO extends BasePersonelUserDTOModel {
  imageName: string;
  imagePath: string;
}
