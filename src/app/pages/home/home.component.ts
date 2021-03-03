import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProductCategory} from '../../core/product-category/product.category.model';
import {ProductCategoryService} from '../../core/product-category/product.category.service';
import {NavbarService} from '../../core/components/navbar/navbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('owlCarousel') private owlCarousel!: ElementRef;

  categories: ProductCategory[] = [];

  constructor(private categoryService: ProductCategoryService,
              private navbarService: NavbarService) {
  }


  ngOnInit(): void {
    this.navbarService.setNavbarTransparent(true);
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

  ngOnDestroy(): void {
    this.navbarService.setNavbarTransparent(false);
  }
}
