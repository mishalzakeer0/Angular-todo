import { Component } from '@angular/core';
import { TaskbarComponent } from './taskbar/taskbar.component';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TaskbarComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  addTask(taskdata: NgForm){
    console.log("form submitted")
  }

}
