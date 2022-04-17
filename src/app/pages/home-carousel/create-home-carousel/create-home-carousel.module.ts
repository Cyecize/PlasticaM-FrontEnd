import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {CreateHomeCarouselComponent} from './create-home-carousel.component';
import {HomeCarouselFormModule} from '../home-carousel-form/home-carousel-form.module';

const routes: Routes = [
  {
    path: '',
    component: CreateHomeCarouselComponent
  }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        HomeCarouselFormModule
    ],
  declarations: [CreateHomeCarouselComponent]
})
export class CreateHomeCarouselModule {

}
