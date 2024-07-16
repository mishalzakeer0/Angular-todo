import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';


@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {

  @ViewChild('bodyDiv') bodyDiv!: ElementRef;

  constructor(private renderer: Renderer2) {}

  

  getTasks
}
