import { BaseModel } from '../base/baseModel';

export interface SectorDescription extends BaseModel {
  sectorId: string;
  title: string;
  description: string;
}
