import {Component, OnInit} from '@angular/core';
import {LoaderService} from './shared/components/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'plastica-m';

  constructor(private loaderService: LoaderService) {
  }

  ngOnInit(): void {
    setTimeout(() => this.loaderService.hide(), 500);
  }
}
