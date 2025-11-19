import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-markenx-breadcrumb',
  templateUrl: './markenx-breadcrumb.component.html',
  styleUrls: ['./markenx-breadcrumb.component.css']
})
export class MarkenxBreadcrumbComponent implements OnInit {
  items: MenuItem[] = [];
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.updateBreadcrumb();
    
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.updateBreadcrumb());
  }

  private updateBreadcrumb(): void {
    const breadcrumbs: MenuItem[] = [];
    let route = this.activatedRoute.root;

    while (route.firstChild) {
      route = route.firstChild;
      const breadcrumb = route.snapshot.data['breadcrumb'];
      if (breadcrumb) {
        breadcrumbs.push({
          label: breadcrumb,
          routerLink: route.snapshot.url.map(segment => segment.path).join('/')
        });
      }
    }

    this.items = breadcrumbs;
  }
}
