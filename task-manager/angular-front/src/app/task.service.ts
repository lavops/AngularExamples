import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private webRequestSerice: WebRequestService
  ) { }

  createList(title: string){
    return this.webRequestSerice.post('lists', {title});
  }

  getLists(){
    return this.webRequestSerice.get('lists');
  }

  createTask(title: string,listId: string){
    return this.webRequestSerice.post(`lists/${listId}/tasks`, {title, listId});
  }

  getTasks(listId: string){
    return this.webRequestSerice.get(`lists/${listId}/tasks`);
  }

  completeTask(task: Task){
    return this.webRequestSerice.patch(`lists/${task._listId}/tasks/${task._id}`, {completed: !task.completed})
  }
}
