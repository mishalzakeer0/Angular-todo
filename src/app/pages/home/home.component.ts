import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BodyComponent } from "./body/body.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, FormsModule, BodyComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  addTask(taskdata: NgForm){
    console.log("form submitted")
  }

}
