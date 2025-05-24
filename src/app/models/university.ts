import { BaseModel } from './baseModel';

export interface University extends BaseModel {
  universityName: string;
  sectorId: number;
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
