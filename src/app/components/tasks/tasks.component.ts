import { Component, OnInit } from '@angular/core';
import { Task } from '../../Tasks';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskService } from '../../services/task.service';
import { HttpClientModule } from '@angular/common/http';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, TaskItemComponent, HttpClientModule, AddTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((task) => this.tasks = task)
  }

  deleteTask(task: Task | undefined) 
  {
    this.taskService.deleteTask(task).subscribe(() => (this.tasks = this.tasks.filter((t) => t.id !== task?.id)))
  }

  toggleReminder(task: Task | undefined)
  {
    console.log("test")
    if(task)
    {
      console.log("test")
      task.reminder = !task?.reminder;
      this.taskService.updateTaskReminder(task).subscribe();
    }
  }

  addTask(task: Task | undefined) {
    this.taskService.addTask(task).subscribe((task) => (this.tasks.push(task)))
  }



}
