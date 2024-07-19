import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TaskService } from '../../../api.service';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NewTask, TodoList } from '../../../model/types';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../../../token.interceptor';


@Component({
  selector: 'app-body',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
})
export class BodyComponent implements OnInit {
  todoList: TodoList[] = [];
  isEditing: { [key: number]: boolean } = {};
  newTask: NewTask = {
    
    user_id: this.cookieService.get('userId'),
    title: '',
    description: '',
    status: 'pending',
    priority: 'Low'
  }
  constructor(
    private cookieService: CookieService,
    private taskService: TaskService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getTasksFromCookie();
  }

  getTasksFromCookie(): void {
    const userId = this.cookieService.get('userId');
    if (userId) {
      const credentials = { user_id: userId };
      this.taskService.getTasks(credentials).subscribe({
        next: (response) => {
          console.log('Tasks details', response);
          if (response) {
            this.todoList = response.message;
            this.isEditing = response.message.reduce(
              (acc: {}, todo) => ({ ...acc, [todo.id]: false }),
              {}
            );
          }
        },
        error: (error) => {
          console.log('Task retrieval failed', error); // Handle task retrieval error
        },
      });
    } else {
      console.log('User ID not found in cookies');
    }
  }

  startEditing(id: number): void {
    this.isEditing[id] = true;
  }

  stopEditing(id: number): void {
    this.isEditing[id] = false;
  }

  updateTask(data: any): void {
    this.taskService.updateTask(data).subscribe({
      next: (response) => {
        console.log('Tasks details', response);
        if (response) {
          console.log(response);

          this.todoList.forEach((item, index) => {
            if (item.id === response.message.id) {
              this.todoList[index] = response.message;
            }
          });
        }
      },
      error: (error) => {
        console.log('Task updation failed', error);
        // Handle task retrieval error
      },
    });
    this.stopEditing(data.id);
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: (response) => {
        console.log('delete details', response);
        if (response) {
          console.log(response);
        }
      },
      error: (error) => {
        console.log('Task updation failed', error);
      },
    });
  }

  addTask(data: NewTask): void {
    this.taskService.addTask(data).subscribe({
      next: (response) => {
        console.log('response', response);
        if (response) {
          console.log(response, 'data added');
        }
      },
      error: (error) => {
        console.log('Task insertion failed', error);
      },
    });
  }
}
