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
      tap<any>( data => this.setUserData(data) )
    );
  }

  register(user: User): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(`${this.apiUrl}/register${this.jsonFormat}`, user);
  }

  isAuthenticated(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user?.token || null;
    return token ? true : false;
  } 

  setUserData(userData: any) {
    const user: string = JSON.stringify({ token: userData?.bearerToken, user: userData?.userId });
    localStorage.setItem( 'user', user );
  }

  getToken(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.token ?? '';
  }

  deleteToken() {
    localStorage.removeItem('user');
  }

  logOut() {
    this.deleteToken();
  }

  getUserLoggedId() {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    return +userData?.user;
  }

}
