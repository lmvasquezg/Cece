import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  // name: string;
  // age: Number;
  // city: string;
  // country: string;
  // address: string;
  // email: string;
  // gender: string;
  // username: string;
  // password: string;

  private userSource = new BehaviorSubject('Helloo');
  currentUsername = this.userSource.asObservable();

  setUsername(username: string) {
    this.userSource.next(username);
  }

  // getUsername() {
  //   return this.username;
  // }

  // getName() {
  //   return this.name;
  // }

  // getAge() {
  //   return this.age;
  // }

  // getCity() {
  //   return this.city;
  // }

  // getCountry() {
  //   return this.country;
  // }

  // getAddress() {
  //   return this.address;
  // }

  // getEmail() {
  //   return this.email;
  // }

  // getGender() {
  //   return this.gender;
  // }

}
