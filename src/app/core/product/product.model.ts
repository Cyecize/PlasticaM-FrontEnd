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
  imageGallery: string[];
  tags: string[];
  specifications: ProductSpecificationModel[];
}

export interface ProductSpecificationModel {
  id: number;
  productId: number;
  titleBg: string;
  titleEn: string;
  valueBg: string;
  valueEn: string;
}
