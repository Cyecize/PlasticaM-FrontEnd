import {HomeCarouselModel} from './home-carousel.model';

export const homeCarouselItems: HomeCarouselModel[] = [
  {
    productId: 3,
    textBg: 'Нашите нови бутилки',
    textEn: 'Our new bottles',
    imageUrl: 'assets/images/uploaded/plastic-wallpaper.jpg/'
  },
  {
    textEn: 'We make can sealers',
    textBg: 'Нашите затварачки за консервни кутии',
    imageUrl: 'assets/images/uploaded/yu-gi-oh-wallpaper.jpg',
    customLink: 'https://zatvarachki.com/'
  },
  {
    productId: 6,
    textEn: 'Experience the road with our best offer',
    textBg: 'Нашето най-добро предложение',
    imageUrl: 'assets/images/uploaded/road.jpg'
  },
  {
    textEn: 'View all of our bottles',
    textBg: 'Вижте всичките ни видове бутилки',
    imageUrl: 'assets/images/uploaded/bottle-ship.jpg',
    customLink: 'products/category/2',
    customLinkSamePage: true
  }
];
