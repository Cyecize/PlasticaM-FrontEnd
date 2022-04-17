import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {HomeCarouselFormComponent} from './home-carousel-form.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [HomeCarouselFormComponent],
  declarations: [HomeCarouselFormComponent]
})
export class HomeCarouselFormModule {

}
