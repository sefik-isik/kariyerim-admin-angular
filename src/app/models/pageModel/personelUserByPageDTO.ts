import { PageModel } from '../base/pageModel';
import { PersonelUserDTO } from '../dto/personelUserDTO';

export interface PersonelUserByPageDTO extends PageModel {
  pageContacts: PersonelUserDTO[];
  contactTotalCount: number;
  totalPages: number;
  firstPage: string;
  lastPage: string;
  nextPage: string;
  previousPage: string;
  currentPage: string;
}
