import {ProductModel} from './product.model';

export const products: ProductModel[] = [
  {
    id: 1,
    categoryId: 2,
    name: 'Pharmacy Bottles',
    descriptionBg: 'Фармацефтични бутилки',
    descriptionEn: 'All sorts of pharmacy bottles',
    imageUrl: './assets/images/uploaded/itemPharmBig23.jpg',
    tags: ['TOP SELLER']
  },

  {
    id: 2,
    categoryId: 2,
    name: 'Oil Bottles',
    descriptionBg: 'Бутилки за олио',
    descriptionEn: 'All sorts of oil bottles',
    imageUrl: './assets/images/uploaded/oil-bot.jpg',
    tags: []
  },

  {
    id: 3,
    categoryId: 2,
    name: 'Mineral Water Bottles',
    descriptionBg: 'Бутилки за Минерална вода',
    descriptionEn: 'All sorts of mineral water bottles',
    imageUrl: './assets/images/uploaded/mineral-wat.jpg',
    tags: []
  },

  {
    id: 4,
    categoryId: 2,
    name: 'Alcohol Bottles',
    descriptionBg: 'Бутилки за Алкохол',
    descriptionEn: 'All sorts of mineral alcohol bottles',
    imageUrl: './assets/images/uploaded/alcohol.jpg',
    tags: []
  },

  {
    id: 5,
    categoryId: 3,
    name: 'Can Juno',
    descriptionBg: 'Полуавтоматична затварачка',
    descriptionEn: 'Semi automatic can sealer',
    imageUrl: './assets/images/uploaded/can-sealers.png',
    tags: []
  },

  {
    id: 6,
    categoryId: 4,
    name: 'Mitsubishi Lancer Evo X',
    descriptionBg: '300 Кс.',
    descriptionEn: '300 HP',
    imageUrl: './assets/images/uploaded/prod4.png',
    tags: ['BEST']
  },

  {
    id: 7,
    categoryId: 5,
    name: 'Plastic Chess',
    descriptionBg: 'Пластмасов шах',
    descriptionEn: 'Plastic chess!',
    imageUrl: './assets/images/uploaded/chess.png',
    tags: ['Featured']
  },

  {
    id: 8,
    categoryId: 5,
    name: 'Plastic Candy Box',
    descriptionBg: 'Кутии за бонбони',
    descriptionEn: 'Plastic candy boxes are good',
    imageUrl: './assets/images/uploaded/candy.jpg',
    tags: ['NEW']
  },
];
