import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Link } from './models/link.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  links: Link[]  = [
    {url: '/table', label: 'Table'},
    {url: '/chart', label: 'Chart'},
    {url: '/calculator', label: 'Calculator'}
  ];

  constructor(private route: ActivatedRoute) {}

  checkActiveRoute(url: string) {
    return (url === this.route.snapshot['_routerState'].url) ? true : false;
  }
}
