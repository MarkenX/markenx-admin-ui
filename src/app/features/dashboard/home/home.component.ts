import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userName: string = '';
  
  constructor(private authService: AuthService) {}
  
  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.userName = user.name || 'Usuario';
      },
      error: () => {
        this.userName = 'Usuario';
      }
    });
  }
}
