import {EventEmitter, Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class NavbarService {

  public readonly onNavbarTransparentChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  public setNavbarTransparent(isTransparent: boolean): void {
    this.onNavbarTransparentChanged.emit(isTransparent);
  }
}
