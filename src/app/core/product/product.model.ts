import {ProductSpecificationDetailedModel} from './productspec/product-specification.model';

export interface ProductModel {
  id: number;
  categoryId: number;
  name: string;
  price?: number;
  descriptionBg: string;
  descriptionEn: string;
  categoryNameEn: string;
  categoryNameBg: string;
  imageUrl: string;
  enabled: boolean;
  imageGallery: string[];
  tags: string[];
  specifications: ProductSpecificationDetailedModel[];
}
