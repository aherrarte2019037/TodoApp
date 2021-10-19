import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServerResponse } from '../models/server-response.model';
import { Task } from '../models/task.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl: string = 'https://localhost:5001';
  private jsonFormat: string = '?format=json';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUserLoggedTasks(): Observable<Task[]> {
    const id = this.authService.getUserLoggedId();
    return this.http.get<ServerResponse>(`${this.apiUrl}/tasks/user/${id}/${this.jsonFormat}`).pipe(
      map( (data) => data.data as Task[])
    );
  }

  create(task: Task): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(`${this.apiUrl}/tasks${this.jsonFormat}`, task);
  }

  updateCompletedValue(id: number, value: boolean): Observable<ServerResponse> {
    return this.http.put<ServerResponse>(`${this.apiUrl}/tasks/${id}${this.jsonFormat}`, { completed: value });
  }

  editById(id: number, toEdit: Task): Observable<ServerResponse> {
    return this.http.put<ServerResponse>(`${this.apiUrl}/tasks/${id}${this.jsonFormat}`, toEdit);
  }


  deleteById(id: number): Observable<ServerResponse> {
    return this.http.delete<ServerResponse>(`${this.apiUrl}/tasks/${id}${this.jsonFormat}`);
  }

}
