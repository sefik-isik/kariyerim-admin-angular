import { BaseUniversityDTOModel } from '../base/baseUniversityDTOModel';

export interface UniversityFacultyDTO extends BaseUniversityDTOModel {
  facultyId: string;
  facultyName: string;
}
