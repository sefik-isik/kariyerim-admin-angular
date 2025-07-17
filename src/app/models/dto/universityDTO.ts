import { BaseModel } from '../base/baseModel';

export interface UniversityDTO extends BaseModel {
  universityName: string;
  sectorId: string;
  sectorName: string;
  yearOfEstablishment: string;
  workerCountId: string;
  workerCountValue: string;
  webAddress: string;
  webNewsAddress: string;
  youTubeEmbedAddress: string;
  address: string;
  facebookAddress: string;
  instagramAddress: string;
  xAddress: string;
  youTubeAddress: string;
  description: string;
  subDescription: string;
}
