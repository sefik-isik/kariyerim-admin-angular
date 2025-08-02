import { PageModel } from '../base/pageModel';
import { UserDTO } from '../dto/userDTO';

export interface AllUserByPageDTO extends PageModel {
  pageContacts: UserDTO[];
  contactTotalCount: number;
  totalPages: number;
  firstPage: string;
  lastPage: string;
  nextPage: string;
  previousPage: string;
  currentPage: string;
}
