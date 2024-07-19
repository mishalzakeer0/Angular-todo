import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Session } from '../../../utils/session';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  isExpanded = false;

  constructor(private session: Session) {}

  onLogout(event: Event) {
    event.stopPropagation(); // Prevent triggering toggleExpand when clicking logout
    console.log('logout clicked');
    this.session.logout();
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
    console.log('toggle clicked inside toggle');
  }
}
