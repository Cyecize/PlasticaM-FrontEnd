import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {CategoryCardComponent} from './components/category-card/category-card.component';
import {ContactsSectionModule} from '../shared/components/contacts-section/contacts-section.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [SharedModule, ContactsSectionModule],
  declarations: [HomeComponent, CategoryCardComponent],
  exports: [HomeComponent]
})
export class HomeModule {

}
