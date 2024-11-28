import { MediaMatcher } from '@angular/cdk/layout';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  mobileQuery: MediaQueryList;

  menuNav = [
    { name: 'Home', url: 'home', icon: 'home' },
    { name: 'Categorias', url: 'category', icon: 'category' },
    { name: 'Productos', url: 'product', icon: 'production_quantity_limits' },
  ];
  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }
}
