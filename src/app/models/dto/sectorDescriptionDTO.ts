import { BaseModel } from '../base/baseModel';

export interface SectorDescriptionDTO extends BaseModel {
  sectorId: string;
  sectorName: string;
  title: string;
  description: string;
}
