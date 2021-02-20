import {ProductCategory} from './product.category.model';

/**
 * Still test data, needs to change to real categories.
 */
export const productCategories: ProductCategory[] = [
  {
    id: 1,
    tags: ['NEW', 'OLD'],
    nameEn: 'Carpet',
    nameBg: 'Килим',
    imageUrl: './assets/images/prod1.png'
  },

  {
    id: 2,
    tags: ['NEW'],
    nameEn: 'Plastic Chess',
    nameBg: 'Пластмасов Шах',
    imageUrl: './assets/images/prod2.png'
  },

  {
    id: 3,
    tags: ['Featured'],
    nameEn: 'Can Sealers',
    nameBg: 'Затварачки за консервни кутии',
    imageUrl: './assets/images/prod3.png'
  },

  {
    id: 4,
    tags: [],
    nameEn: 'Cars',
    nameBg: 'Коли',
    imageUrl: './assets/images/prod4.png'
  },

  {
    id: 5,
    tags: [],
    nameEn: 'Verti',
    nameBg: 'Верти',
    imageUrl: './assets/images/wrong-v.png'
  },

  {
    id: 6,
    tags: [],
    nameEn: 'Hori',
    nameBg: 'Хори',
    imageUrl: './assets/images/wrong-h.png'
  },
];
