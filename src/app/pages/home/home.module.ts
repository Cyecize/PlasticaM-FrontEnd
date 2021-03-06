import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {CategoryCardComponent} from './components/category-card/category-card.component';
import {ContactsSectionModule} from '../../shared/components/contacts-section/contacts-section.module';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import { CarouselComponent } from './components/carousel/carousel.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    ContactsSectionModule,
    RouterModule.forChild(routes),
  ],
  declarations: [HomeComponent, CategoryCardComponent, CarouselComponent],
  exports: [HomeComponent]
})
export class HomeModule {

}
