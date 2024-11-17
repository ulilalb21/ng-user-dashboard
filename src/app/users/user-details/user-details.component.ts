import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent implements OnInit {
  loading: Boolean = false;
  user: User | undefined = undefined;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('userId');
    this.loading = true;

    this.userService
      .getUserById(Number(userId))
      .pipe(
        catchError(() => {
          // if user not found, redirect to user list
          this.router.navigate(['/users']);
          return of(undefined);
        }),
      )
      .subscribe((user) => {
        this.user = user;
        this.loading = false;
      });
  }
}
