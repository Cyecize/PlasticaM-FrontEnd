import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {ProductDetailsComponent} from './product-details.component';
import {RouterModule, Routes} from '@angular/router';
import { GalleryComponent } from './components/gallery/gallery.component';
import {ContactsSectionModule} from '../../shared/components/contacts-section/contacts-section.module';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailsComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    ContactsSectionModule
  ],
  declarations: [ProductDetailsComponent, GalleryComponent]
})
export class ProductDetailsModule {

}
