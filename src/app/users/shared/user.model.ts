export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: Address;
  phone: string;
  website: string;
  company?: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export const mockUser: User = {
  id: 1,
  name: 'Foo',
  email: 'foo@gmail.com',
  username: 'foo',
  phone: '08123456789',
  website: 'https://foofoofaa.fa',
};

export const mockUsers: User[] = [mockUser];
