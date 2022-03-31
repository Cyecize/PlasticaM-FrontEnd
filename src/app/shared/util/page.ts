import {PageRequest} from './page-request';

export interface Page<T> {
  elements: T[];
  pages: number;
  itemsCount: number;
  pageable: PageRequest;
}

export class EmptyPage<T> implements Page<T> {
  elements: T[] = [];
  itemsCount = 0;
  pageable: PageRequest = {page: 0, size: 10};
  pages = 0;
}
