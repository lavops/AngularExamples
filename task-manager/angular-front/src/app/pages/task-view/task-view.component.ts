import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { List } from 'src/app/models/list.model';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: List[];
  tasks: Task[];

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) =>{
        if(params.listId){
          //console.log(params);
          this.taskService.getTasks(params.listId).subscribe((tasks: Task[])=>{
            //console.log(tasks);
            this.tasks = tasks;
          });
        } else {
          this.tasks = undefined;
        }
      }
    );

    this.taskService.getLists().subscribe((lists: List[])=>{
      //console.log(lists);
      this.lists = lists;
    });
  }

  onTaskClick(task: Task){
    this.taskService.completeTask(task).subscribe(()=>{
      //console.log("Completed Successfully");
      task.completed = !task.completed;
    });
  }
}
