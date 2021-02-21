import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductCategory} from '../../core/product-category/product.category.model';
import {ProductCategoryService} from '../../core/product-category/product.category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('owlCarousel') private owlCarousel!: ElementRef;

  categories: ProductCategory[] = [];

  constructor(private categoryService: ProductCategoryService) {
  }


  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(value => {
      this.categories = value;
    });
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    if (window.components) {
      // @ts-ignore
      window.components.owlCarousel.init([this.owlCarousel.nativeElement]);
    }
  }
}
