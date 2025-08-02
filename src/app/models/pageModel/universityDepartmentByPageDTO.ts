import { PageModel } from '../base/pageModel';
import { UniversityDepartment } from '../component/universitydepartment';

export interface UniversityDepartmentByPageDTO extends PageModel {
  pageContacts: UniversityDepartment[];
  contactTotalCount: number;
  totalPages: number;
  firstPage: string;
  lastPage: string;
  nextPage: string;
  previousPage: string;
  currentPage: string;
}
