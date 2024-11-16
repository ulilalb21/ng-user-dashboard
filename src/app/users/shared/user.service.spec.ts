import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { User } from './user.model';

describe('UserService', () => {
  let service: UserService;
  let httpTesting: HttpTestingController;
  const mockUser: User = {
    id: 1,
    name: 'Foo',
    email: 'foo@gmail.com',
    username: 'foo',
    phone: '08123456789',
    website: 'https://foofoofaa.fa',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(UserService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('Should fetch users', () => {
    const mockUsers: User[] = [mockUser];

    service.getUsers().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpTesting.expectOne(
      'https://jsonplaceholder.typicode.com/users',
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockUsers);
  });

  it('Should fetch user by id', () => {
    service.getUserById(1).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpTesting.expectOne(
      'https://jsonplaceholder.typicode.com/users/1',
    );

    expect(req.request.method).toEqual('GET');
    req.flush(mockUser);
  });
});
