import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  url: string = 'http://localhost:3000'

  user: any;

  // signUp methods

  createUser(userDataToPost: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + '/user', userDataToPost).subscribe(
        (res) => {
          resolve(res)
        },
        (err) => {
          reject(err)
        },
      )
    })
  }

  getUser(email: any) {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + '/user?email=' + email).subscribe(
        (res) => {
          resolve(res)},
        (err) => {
          reject(err)
        },
      )
    })
  }

}
