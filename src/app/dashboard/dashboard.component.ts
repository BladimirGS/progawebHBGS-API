// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  menuItems = [
    { name: 'Users', link: '/dashboard/users', icon: 'group' }, // Ícono para usuarios
    { name: 'Pokemon', link: '/dashboard/pokemon', icon: 'pets' }, // Ícono para Pokémon
  ];
  
  currentUser: any = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
  }

  logout(): void {
    this.currentUser = null; 
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
