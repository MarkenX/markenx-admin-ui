import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-markenx-header',
  templateUrl: './markenx-header.component.html',
  styleUrls: ['./markenx-header.component.css']
})
export class MarkenxHeaderComponent {
  @Input() title: string = '';
  @Input() userName: string = '';
  @Output() logout = new EventEmitter<void>();

  onLogout(): void {
    this.logout.emit();
  }
}
