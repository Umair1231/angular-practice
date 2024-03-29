import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../Tasks';
import { TASKS } from '../mock-tasks';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = "http://localhost:3000/tasks";

  constructor(private http:HttpClient) { }

  getTasks(): Observable<Task[]>  {
    return this.http.get<Task[]>(this.apiUrl);
  }

  deleteTask(task: Task | undefined): Observable<Task> {
    const url = `${this.apiUrl}/${task?.id}`
    return this.http.delete<Task>(url)
  }

  updateTaskReminder(task: Task | undefined): Observable<Task> {
    const url = `${this.apiUrl}/${task?.id}`
    return this.http.put<Task>(url, task, httpOptions)
  }

  addTask(task: Task | undefined): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, httpOptions)
  }
}
