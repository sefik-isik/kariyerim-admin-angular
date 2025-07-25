import { BaseModel } from '../base/baseModel';

export interface University extends BaseModel {
  universityName: string;
  sectorId: string;
  yearOfEstablishment: string;
  workerCountId: string;
  webAddress: string;
  webNewsAddress: string;
  youTubeEmbedAddress: string;
  address: string;
  facebookAddress: string;
  instagramAddress: string;
  xAddress: string;
  youTubeAddress: string;
}
