import {PageRequest} from '../../../shared/util/page-request';

export interface SpecificationTypeQuery {
  page: PageRequest;
  categoryIds: number[];
}
