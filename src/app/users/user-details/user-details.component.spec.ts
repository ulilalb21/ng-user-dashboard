import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { UserDetailsComponent } from './user-details.component';
import { UserService } from '../shared/user.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { mockUser } from '../shared/user.model';
import { delay, of } from 'rxjs';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailsComponent],
      providers: [
        UserService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    userService = TestBed.inject(UserService);

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a loading indicator while fetching users', fakeAsync(() => {
    const observable = of(mockUser).pipe(delay(100)); // Simulate a delay
    spyOn(userService, 'getUserById').and.returnValue(observable);

    fixture.detectChanges();

    const loadingIndicator = fixture.nativeElement.querySelector('.loading');
    expect(loadingIndicator).toBeTruthy();

    // Advance time to let the observable complete
    tick(101);
    fixture.detectChanges();

    const loading = fixture.nativeElement.querySelector('.loading');
    expect(loading).toBeFalsy();

    const userNameEl = fixture.nativeElement.querySelector('.user-name');
    expect(userNameEl.textContent).toContain(component.user?.name);
  }));
});
