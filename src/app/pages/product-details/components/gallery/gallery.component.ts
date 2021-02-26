import {Component, Input, OnInit} from '@angular/core';
import {ObjectUtils} from '../../../../shared/util/object-utils';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  @Input()
  images!: string[];

  currentImage!: string;

  constructor() {
  }

  ngOnInit(): void {
    if (!ObjectUtils.isNil(this.images) && this.images.length > 0) {
      this.selectImage(this.images[0]);
    }
  }

  selectImage(src: string): void {
    this.currentImage = src;
  }
}
