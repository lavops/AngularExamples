import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { Task } from 'src/app/models/task.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  listId: string;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) =>{
        this.listId = params['listId'];
      });
  }

  createTask(title: string){
    this.taskService.createTask(title, this.listId).subscribe((task: Task)=>{
      console.log(task);
      //Navigate to lists/:listId
      //Vrati se jednu rutu nazad
      this.router.navigate(['../'], {relativeTo: this.route});
    });
  }
}
