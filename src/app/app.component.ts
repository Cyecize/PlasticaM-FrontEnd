import {AfterViewInit, Component, OnInit} from '@angular/core';
import {LoaderService} from './shared/components/loader/loader.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'plastica-m';

  constructor(private loaderService: LoaderService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  ngAfterViewInit(): void {
    if (window.hasOwnProperty('components')) {
      this.loaderService.hide();
    }

    // @ts-ignore
    window.componentsLoaded = () => setTimeout(() => this.loaderService.hide(), 500);
  }
}
