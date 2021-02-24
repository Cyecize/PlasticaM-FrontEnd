import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from './products.component';
import {AppRoutingPath} from '../../app-routing.path';
import {ProductCatalogComponent} from './components/product-catalog/product-catalog.component';
import {ProductCardComponent} from './components/product-card/product-card.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    pathMatch: 'exact'
  },
  {
    path: AppRoutingPath.PRODUCTS_CATEGORY.path,
    component: ProductsComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProductsComponent, ProductCatalogComponent, ProductCardComponent]
})
export class ProductsModule {

}
