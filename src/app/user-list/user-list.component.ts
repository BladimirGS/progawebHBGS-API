import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  displayedUsers: any[] = [];
  loading = true;
  currentPage = 1;
  pageSize = 5;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.updateDisplayedUsers();
      this.loading = false;
    });
  }

  nextPage() {
    if (this.endIndex < this.users.length) {
      this.currentPage++;
      this.updateDisplayedUsers();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedUsers();
    }
  }
  
  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.pageSize, this.users.length);
  }

  updateDisplayedUsers() {
    this.displayedUsers = this.users.slice(this.startIndex, this.endIndex);
  }

  trackByUserId(index: number, user: any): number {
    return user.id;
  }
}
