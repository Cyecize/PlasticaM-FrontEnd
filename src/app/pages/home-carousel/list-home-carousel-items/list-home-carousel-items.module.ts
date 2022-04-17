import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {HomeCarouselFormModule} from '../home-carousel-form/home-carousel-form.module';
import {ListHomeCarouselItemsComponent} from './list-home-carousel-items.component';

const routes: Routes = [
  {
    path: '',
    component: ListHomeCarouselItemsComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    HomeCarouselFormModule
  ],
  declarations: [ListHomeCarouselItemsComponent]
})
export class ListHomeCarouselItemsModule {

}
