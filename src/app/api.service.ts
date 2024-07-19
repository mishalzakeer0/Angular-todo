import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environment/environment.dev';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = environment.baseUrl;
  private apiUrl = `${this.baseUrl}`;
  
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  userLogin(credentials: { email: string; password: string }): Observable<any> {
    const loginUrl = `${this.baseUrl}/login`;
    return this.http
      .post<any>(loginUrl, credentials, this.httpOptions) // Include credentials
      .pipe(catchError(this.handleError<any>('userLogin')));
  }
  
  userSignUp(credentials: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }): Observable<any> {
    const signUpUrl = `${this.baseUrl}/signup`;
    return this.http
      .post<any>(signUpUrl, credentials)
      .pipe(catchError(this.handleError<any>('userLogin')));
  }
  getTasks(credentials: { user_id: string }): Observable<any> {
    const getTaskUrl = `${this.baseUrl}/tasks`;
    const params = new HttpParams().set('user_id', credentials.user_id);
    return this.http
    .get<any>(getTaskUrl, { params, withCredentials: true}, )
    .pipe(catchError(this.handleError<any>('getTasks')));
  }  
  updateTask(task: any): Observable<any> {
    const getUpdateUrl = `${this.baseUrl}/updateTask`;
    return this.http
      .put(getUpdateUrl, task, { withCredentials: true })
      .pipe(catchError(this.handleError<any>('updateTask')));
  }  

  addTask(task: any): Observable<any> {
    const getAddUrl = `${this.baseUrl}/createTask`;
    return this.http
      .post<any>(getAddUrl, task, { withCredentials: true })
      .pipe(catchError(this.handleError<any>('addTask')));
  }

  deleteTask(id: number): Observable<any> {
    const url = `${this.apiUrl}/deleteTask?id=${id}`; // Include the ID in the URL
    return this.http
      .delete<any>(url, { withCredentials: true })
      .pipe(catchError(this.handleError<any>('deleteTask')));
  }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true //this is required so that Angular returns the Cookies received from the server. The server sends cookies in Set-Cookie header. Without this, Angular will ignore the Set-Cookie header
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
