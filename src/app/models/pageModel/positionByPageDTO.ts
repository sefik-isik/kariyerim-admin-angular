import { PageModel } from '../base/pageModel';
import { Position } from '../component/position';

export interface PositionByPageDTO extends PageModel {
  pageContacts: Position[];
  contactTotalCount: number;
  totalPages: number;
  firstPage: string;
  lastPage: string;
  nextPage: string;
  previousPage: string;
  currentPage: string;
}
