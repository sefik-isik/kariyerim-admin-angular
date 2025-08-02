import { PageModel } from '../base/pageModel';
import { TaxOffice } from '../component/taxOffice';

export interface TaxOfficeByPageDTO extends PageModel {
  pageContacts: TaxOffice[];
  contactTotalCount: number;
  totalPages: number;
  firstPage: string;
  lastPage: string;
  nextPage: string;
  previousPage: string;
  currentPage: string;
}
