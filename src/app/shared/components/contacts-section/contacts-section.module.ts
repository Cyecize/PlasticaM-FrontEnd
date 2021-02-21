import {NgModule} from '@angular/core';
import {ContactsSectionComponent} from './contacts-section.component';
import {MailFormComponent} from './mail-form/mail-form.component';
import {SharedModule} from '../../shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [ContactsSectionComponent, MailFormComponent]
})
export class ContactsSectionModule {

}
