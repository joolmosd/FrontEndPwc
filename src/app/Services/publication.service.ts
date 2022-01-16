import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Publication } from '../Entities/Publication';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  url = "http://localhost:8080/api/v1"

  constructor(private http: HttpClient,private router: Router) {}


     save(data: any): Observable<any> {
      return this.http.post(`${this.url}/postPublication`, data)
    }

    getAll(): Observable<Publication[]>{
      return this.http.get<Publication[]>(`${this.url}/getAllPublications`)
    }


    update(id: string, data:any): Observable<Publication> {
      return this.http.put<Publication>(`${this.url}/putPublication/${id}`, data);
    }


    delete(id: string): Observable<Publication[]>{
      return this.http.delete<Publication[]>(`${this.url}/deletePublication/${id}`)
    }


    getWithId(id: string): Observable<any>{
      return this.http.get<Publication>(`${this.url}/getPublication/${id}`)
    }

    getPublicationName(PublicationName: String): Observable<string> {
      return this.http.get<string>(`${this.url}/getPublicationName/${PublicationName}`);
    }
}
