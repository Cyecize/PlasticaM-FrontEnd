export interface HomeCarouselModel {
  id: number;
  textBg: string;
  textEn: string;
  imageUrl: string;
  customLink?: string;
  customLinkSamePage?: boolean;
  enabled: boolean;
  orderNumber: number;
  productId?: number;
}
