import {Base64File} from '../../shared/base64/base64-file';

export interface CreateHomeCarouselModel {
  productId?: number;
  textEn: string;
  textBg: string;
  image: Base64File;
  customLink?: string;
  customLinkSamePage?: boolean;
  enabled?: boolean;
  orderNumber: number;
}
