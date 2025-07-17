import { BaseUniversityDTOModel } from '../base/baseUniversityDTOModel';

export interface UniversityImage extends BaseUniversityDTOModel {
  imageName: string;
  imageOwnName: string;
  imagePath: string;
  isMainImage: boolean;
  isLogo: boolean;
}
