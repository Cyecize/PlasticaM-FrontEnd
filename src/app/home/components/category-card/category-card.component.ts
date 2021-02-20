import {Component, Input, OnInit} from '@angular/core';
import {ProductCategory} from '../../../core/product-category/product.category.model';
import {TranslatorService} from '../../../core/translate/translator.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent implements OnInit {

  @Input()
  category: ProductCategory | any = {};

  constructor(public translator: TranslatorService) {

  }

  ngOnInit(): void {

  }
}
