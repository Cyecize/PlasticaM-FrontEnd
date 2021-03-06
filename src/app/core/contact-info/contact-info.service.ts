import {EventEmitter, Injectable} from '@angular/core';
import {ContactInfoModel} from './contact-info.model';
import {Observable} from 'rxjs';
import {ObjectUtils} from '../../shared/util/object-utils';
import {ContactInfoRepository} from './contact-info.repository';

@Injectable({providedIn: 'root'})
export class ContactInfoService {
  private contactInfo?: ContactInfoModel;
  private readonly contactInfoEvent: EventEmitter<ContactInfoModel> = new EventEmitter<ContactInfoModel>();

  constructor(private repository: ContactInfoRepository) {
    this.repository.fetch().subscribe(value => {
      this.contactInfo = value;
      this.contactInfoEvent.emit(value);
    });
  }

  public getContactInfo(): Observable<ContactInfoModel> {
    if (!ObjectUtils.isNil(this.contactInfo)) {
      return new Observable<ContactInfoModel>(subscriber => subscriber.next(this.contactInfo));
    }

    return this.contactInfoEvent;
  }
}
