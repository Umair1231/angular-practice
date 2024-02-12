import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { Subscription } from 'rxjs';
import { UiService } from '../../services/ui.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  title:string = 'Task Tracker'
  showAddTask: boolean = true;
  subscription: Subscription = new Subscription();

  constructor(private uiService: UiService, private router: Router) {
    this.subscription = this.uiService.onToggle().subscribe( value => this.showAddTask = value)
  }

  ngOnInit(): void {
    
  }

  toggleAddTask()
  {
    this.uiService.toggleAddTask()
  }

  hasRoute(route: string)
  {
    return this.router.url === route;
  }
}
