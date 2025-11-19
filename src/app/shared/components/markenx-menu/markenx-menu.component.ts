import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MarkenxMenuItem } from '../markenx-layout/markenx-layout.component';

@Component({
  selector: 'app-markenx-menu',
  templateUrl: './markenx-menu.component.html',
  styleUrls: ['./markenx-menu.component.css']
})
export class MarkenxMenuComponent {
  @Input() menuItems: MarkenxMenuItem[] = [];
  expandedItems: Set<string> = new Set();

  constructor(private router: Router) {}

  toggleSubMenu(itemValue: string): void {
    if (this.expandedItems.has(itemValue)) {
      this.expandedItems.delete(itemValue);
    } else {
      this.expandedItems.add(itemValue);
    }
  }

  isExpanded(itemValue: string): boolean {
    return this.expandedItems.has(itemValue);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
