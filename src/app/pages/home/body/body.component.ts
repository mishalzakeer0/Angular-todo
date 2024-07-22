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
          console.log('Task retrieval failed', error);
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
      },
    });
    this.stopEditing(data.id);
  }

  deleteTask(id: number): void {
    const originalTasks = [...this.todoList];
    this.todoList = this.todoList.filter(task => task.id !== id);

    this.taskService.deleteTask(id).subscribe({
      next: (response) => {
        console.log('delete details', response);
      },
      error: (error) => {
        console.log('Task deletion failed', error);
        
        this.todoList = originalTasks;
      },
    });
  }

  addTask(data: NewTask): void {
    
    const tempTask: TodoList = { 
      id: Date.now(), 
      user_id: Number(data.user_id),
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority
    };

    this.todoList.push(tempTask);

    this.taskService.addTask(data).subscribe({
      next: (response) => {
        console.log('response', response);
        if (response) {
          console.log(response, 'data added');
          
          this.todoList = this.todoList.map(task =>
            task.id === tempTask.id ? response.message : task
          );
        }
      },
      error: (error) => {
        console.log('Task insertion failed', error);
        
        this.todoList = this.todoList.filter(task => task.id !== tempTask.id);
      },
    });
  }
}
