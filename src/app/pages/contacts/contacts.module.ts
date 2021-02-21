import {NgModule} from '@angular/core';
import {ContactsSectionModule} from '../../shared/components/contacts-section/contacts-section.module';
import {ContactsComponent} from './contacts.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ContactsComponent
  }
];

@NgModule({
  imports: [
    ContactsSectionModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ContactsComponent]
})
export class ContactsModule {

}
