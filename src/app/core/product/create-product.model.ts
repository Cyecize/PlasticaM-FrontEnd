import {Base64File} from '../../shared/base64/base64-file';
import {CreateProductSpecificationModel} from './productspec/create-product-specification.model';

export interface CreateProductModel {
  categoryId: number;
  productName: string;
  price?: number;
  descriptionEn: string;
  descriptionBg: string;
  image: Base64File;
  tagNames: string[];
  enabled: boolean;
  productSpecifications: CreateProductSpecificationModel[];
  existingProductSpecifications: number[];
  gallery: Base64File[];
}
