export interface ProductModel {
  id: number;
  categoryId: number;
  name: string;
  price?: number;
  descriptionBg: string;
  descriptionEn: string;
  imageUrl: string;
  imageGallery: string[];
  tags: string[];
}
