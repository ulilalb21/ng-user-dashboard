import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-user-details',
  standalone: true,
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent implements OnInit {
  loading: Boolean = false;
  user: User | undefined = undefined;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('userId');
    this.loading = true;

    this.userService
      .getUserById(Number(userId))
      .pipe(
        catchError(() => {
          return of(undefined);
        }),
      )
      .subscribe((user) => {
        this.user = user;
        this.loading = false;
      });
  }
}
