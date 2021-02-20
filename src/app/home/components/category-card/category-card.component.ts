import {Component, Input, OnInit} from '@angular/core';
import {ProductCategory} from '../../models/product.category.model';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent implements OnInit {

  @Input()
  category: ProductCategory | any = {};

  constructor() {
    // TODO: add lang service to determine which property to get for name.
  }

  ngOnInit(): void {

  }
}
