import {ProductCategory} from './product.category.model';

/**
 * Still test data, needs to change to real categories.
 */
export const productCategories: ProductCategory[] = [
  {
    id: 1,
    tags: ['NEW'],
    nameEn: 'Cans',
    nameBg: 'Кенове',
    imageUrl: './assets/images/uploaded/cans.png'
  },

  {
    id: 2,
    tags: ['NEW'],
    nameEn: 'Bottles',
    nameBg: 'Бутилки',
    imageUrl: './assets/images/uploaded/bottles.png'
  },

  {
    id: 3,
    tags: ['Featured'],
    nameEn: 'Can Sealers',
    nameBg: 'Затварачки за консервни кутии',
    imageUrl: './assets/images/uploaded/can-sealers.png'
  },

  {
    id: 4,
    tags: [],
    nameEn: 'Cars',
    nameBg: 'Коли',
    imageUrl: './assets/images/uploaded/prod4.png'
  },

  {
    id: 5,
    tags: [],
    nameEn: 'Plastic products',
    nameBg: 'Пластмасови изделия',
    imageUrl: './assets/images/uploaded/chess.png'
  },

];
