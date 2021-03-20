import {Component, OnInit} from '@angular/core';
import {LoaderService} from './shared/components/loader/loader.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'plastica-m';

  constructor(private loaderService: LoaderService,
              private router: Router) {
  }

  ngOnInit(): void {
    setTimeout(() => this.loaderService.hide(), 500);
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
