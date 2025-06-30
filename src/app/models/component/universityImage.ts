import { BaseUniversityModel } from '../base/baseUniversityModel';

export interface UniversityImage extends BaseUniversityModel {
  imageName: string;
  imageOwnName: string;
  imagePath: string;
  isMainImage: boolean;
  isLogo: boolean;
}
