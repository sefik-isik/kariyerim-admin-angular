import { BaseModel } from './baseModel';

export interface UniversityDTO extends BaseModel {
  universityName: string;
  sectorId: number;
  sectorName: string;
  yearOfEstablishment: string;
  workerCount: string;
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
