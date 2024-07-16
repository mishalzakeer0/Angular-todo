import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environment/environment.dev';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = environment.baseUrl
  private apiUrl = `${this.baseUrl}/tasks`; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  userLogin(credentials: { email: string; password: string }): Observable<any> {
    const loginUrl = `${this.baseUrl}/login`; // Replace with your login API endpoint
    return this.http
      .post<any>(loginUrl, credentials,)
      .pipe(catchError(this.handleError<any>('userLogin')));
  }
  userSignUp(credentials: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }): Observable<any> {
    const signUpUrl = `${this.baseUrl}/signup`; // Replace with your login API endpoint
    return this.http
      .post<any>(signUpUrl, credentials)
      .pipe(catchError(this.handleError<any>('userLogin')));
  }
  getTasks(credentials: { user_id: string }): Observable<any> {
    const getTaskUrl = `${this.baseUrl}/tasks`; // Replace with your login API endpoint

    return this.http
      .post<any>(getTaskUrl, credentials)
      .pipe(catchError(this.handleError<any>('getTasks')));
  }
  updateTask(task: any): Observable<any> {
    return this.http
      .put(this.apiUrl, task, this.httpOptions)
      .pipe(catchError(this.handleError<any>('updateTask')));
  }

  addTask(task: any): Observable<any> {
    return this.http
      .post<any>(this.apiUrl, task, this.httpOptions)
      .pipe(catchError(this.handleError<any>('addTask')));
  }

  deleteTask(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .delete<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError<any>('deleteTask')));
  }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
