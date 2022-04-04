import {Base64File} from '../../shared/base64/base64-file';

export interface CreateProductCategoryModel {
  nameEn: string;
  nameBg: string;
  image: Base64File;
  tagNames: string[];
}
