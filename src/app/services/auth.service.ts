import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerResponse } from '../models/server-response.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = 'https://localhost:5001';
  private formatQueryParam: string = '?format=json';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/credentials${this.formatQueryParam}`, {username, password});
  }

  register(user: User): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(`${this.apiUrl}/register${this.formatQueryParam}`, user);
  }

}
