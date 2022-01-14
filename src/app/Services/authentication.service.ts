import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IdUser } from '../Entities/IdUser';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // BASE_PATH: 'http://localhost:8080'
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
  username!: String;
  password!: String;
  

  constructor(private http:HttpClient) { }

  authenticationService(username: String, password: String) {
    return this.http.get('http://localhost:8080/api/v1/basicauth',
      { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => {
        console.log(this.createBasicAuthToken(username, password));
        this.username = username;
        this.password = password;
        this.registerSuccessfulLogin(this.password );
      }));
  }

  login(username: String, password: String): Observable<any> {
    return this.http.get(`${'http://localhost:8080/api/v1/login'}/${username}/${password}`);
  }

  emailService(data:any):Observable<any>{
    return this.http.get('http://localhost:8080/api/v1/email',data);
  }

  createBasicAuthToken(username: String, identification: String) { 
  //console.log(window.btoa(username + ":" + password)) 
    return window.btoa(username + ":" + identification)
  }

  registerSuccessfulLogin(identification:any) {

    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME,identification)
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.username = "";
    this.password = "";
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }
}
