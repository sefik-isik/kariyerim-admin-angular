import { PageModel } from '../base/pageModel';
import { CompanyUserDTO } from '../dto/companyUserDTO';

export interface CompanyUserByPageDTO extends PageModel {
  pageContacts: CompanyUserDTO[];
  contactTotalCount: number;
  totalPages: number;
  firstPage: string;
  lastPage: string;
  nextPage: string;
  previousPage: string;
  currentPage: string;
}
