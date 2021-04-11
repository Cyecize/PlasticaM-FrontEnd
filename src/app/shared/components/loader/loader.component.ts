import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LoaderService} from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  active = true;

  constructor(private loaderService: LoaderService,
              private ref: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.loaderService.loading$.subscribe(value => {
      if (this.active === value) {
        return;
      }

      this.active = value;
      this.ref.detectChanges();
    });
  }
}
