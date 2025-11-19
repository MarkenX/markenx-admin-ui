import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface MarkenxMenuItem {
  value: string;
  label: string;
  icon: string;
  route: string;
  subItems?: MarkenxMenuItem[];
}

@Component({
  selector: 'app-markenx-layout',
  templateUrl: './markenx-layout.component.html',
  styleUrls: ['./markenx-layout.component.css']
})
export class MarkenxLayoutComponent {
  @Input() headerTitle: string = '';
  @Input() userName: string = '';
  @Input() menuItems: MarkenxMenuItem[] = [];
  @Output() logout = new EventEmitter<void>();

  onLogout(): void {
    this.logout.emit();
  }
}
