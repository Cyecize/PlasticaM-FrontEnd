import {PageRequest} from './page-request';

export interface Page<T> {
  elements: T[];
  pages: number;
  itemsCount: number;
  pageable: PageRequest;
}
