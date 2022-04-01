import {SortQuery} from '../../shared/util/sort.query';
import {PageRequest} from '../../shared/util/page-request';

export interface ProductQuery {
  sort?: SortQuery;
  page?: PageRequest;
  categoryIds: number[];
  specifications: number[];
  hidden?: boolean;
  search?: string;
}
