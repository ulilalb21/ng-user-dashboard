import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  loading: Boolean = false;
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loading = true;
    this.userService
      .getUsers()
      .pipe(
        catchError(() => {
          return of([]);
        }),
      )
      .subscribe((users) => {
        this.users = users;
        this.loading = false;
      });
  }
}
