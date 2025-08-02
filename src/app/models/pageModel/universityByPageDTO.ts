import { PageModel } from '../base/pageModel';
import { UniversityDTO } from '../dto/universityDTO';

export interface UniversityByPageDTO extends PageModel {
  pageContacts: UniversityDTO[];
  contactTotalCount: number;
  totalPages: number;
  firstPage: string;
  lastPage: string;
  nextPage: string;
  previousPage: string;
  currentPage: string;
}
