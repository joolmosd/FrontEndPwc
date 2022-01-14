import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../Entities/User';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  url = "http://localhost:8080/api/v1"

  constructor(private http: HttpClient,private router: Router) {}


     save(data: any): Observable<any> {
      return this.http.post(`${this.url}/postUser`, data)
    }

    getAll(): Observable<User[]>{
      return this.http.get<User[]>(`${this.url}/getAllUsers`)
    }


    update(id: string, data:any): Observable<User> {
      return this.http.put<User>(`${this.url}/putUser/${id}`, data);
    }


    delete(id: string): Observable<User[]>{
      return this.http.delete<User[]>(`${this.url}/deleteUser/${id}`)
    }


    getWithId(id: string): Observable<any>{
      return this.http.get<User>(`${this.url}/getUser/${id}`)
    }

    getUserName(userName: String): Observable<string> {
      return this.http.get<string>(`${this.url}/getUserName/${userName}`);
    }
}
