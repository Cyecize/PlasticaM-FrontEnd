import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {HomeCarouselFormModule} from '../home-carousel-form/home-carousel-form.module';
import {EditHomeCarouselComponent} from './edit-home-carousel.component';

const routes: Routes = [
  {
    path: '',
    component: EditHomeCarouselComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    HomeCarouselFormModule
  ],
  declarations: [EditHomeCarouselComponent]
})
export class EditHomeCarouselModule {

}
