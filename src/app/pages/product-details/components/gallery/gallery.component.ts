import {Component, Input, OnInit} from '@angular/core';
import {ObjectUtils} from '../../../../shared/util/object-utils';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  private _images!: string[];

  get images(): string[] {
    return this._images;
  }

  @Input()
  set images(value: string[]) {
    this._images = value;
    this.initSelectedImage();
  }

  currentImage!: string;

  constructor() {
  }

  ngOnInit(): void {
    this.initSelectedImage();
  }

  selectImage(src: string): void {
    this.currentImage = src;
  }

  private initSelectedImage(): void {
    if (!ObjectUtils.isNil(this.images) && this.images.length > 0) {
      this.selectImage(this.images[0]);
    }
  }
}
