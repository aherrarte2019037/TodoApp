import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { ServerResponse } from '../models/server-response.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = 'https://localhost:5001';
  private jsonFormat: string = '?format=json';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/credentials${this.jsonFormat}`, {username, password}).pipe(
      tap<any>( data => this.setToken(data.bearerToken) )
    );
  }

  register(user: User): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(`${this.apiUrl}/register${this.jsonFormat}`, user);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') ? true : false;
  } 

  setToken(token: string) {
    localStorage.setItem( 'token', token );
  }

  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  logOut() {
    this.deleteToken();
  }

}
