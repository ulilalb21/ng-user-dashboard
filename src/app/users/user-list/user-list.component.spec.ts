import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { UserService } from '../shared/user.service';
import { mockUsers } from '../shared/user.model';
import { delay, of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [
        UserService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    userService = TestBed.inject(UserService);

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display a loading indicator while fetching users', fakeAsync(() => {
    const observable = of(mockUsers).pipe(delay(100)); // Simulate a delay
    spyOn(userService, 'getUsers').and.returnValue(observable);

    fixture.detectChanges();

    const loadingIndicator = fixture.nativeElement.querySelector('.loading');
    expect(loadingIndicator).toBeTruthy();

    // Advance time to let the observable complete
    tick(101);
    fixture.detectChanges();

    const loading = fixture.nativeElement.querySelector('.loading');
    expect(loading).toBeFalsy();

    const userList = fixture.nativeElement.querySelectorAll('.user-row');
    expect(userList.length).toBe(1);
  }));

  it('should display no users', () => {
    spyOn(userService, 'getUsers').and.returnValue(of([]));

    fixture.detectChanges();

    const empty = fixture.nativeElement.querySelector('.empty');
    const userList = fixture.nativeElement.querySelectorAll('.user-row');

    expect(empty).toBeTruthy();
    expect(userList.length).toBe(0);
  });
});
