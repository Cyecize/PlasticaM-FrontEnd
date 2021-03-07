import {SortQuery} from '../../shared/util/sort.query';

export const SORT_OPTIONS: SortOption[] = [
  {
    sortQuery: {
      field: 'name',
      direction: 'asc'
    },
    name: 'name.asc'
  },
  {
    sortQuery: {
      field: 'price',
      direction: 'ASC'
    },
    name: 'price.asc'
  },
  {
    sortQuery: {
      field: 'price',
      direction: 'desc'
    },
    name: 'price.desc',
  }
];

export interface SortOption {
  sortQuery: SortQuery;
  name: string;
}
