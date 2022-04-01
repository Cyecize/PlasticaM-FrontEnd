export interface ProductSpecificationModel {
  id: number;
  valueBg: string;
  valueEn: string;
  specificationTypeId: number;
}

export interface ProductSpecificationDetailedModel extends ProductSpecificationModel {
  specificationType: string;
  titleBg: string;
  titleEn: string;
}
