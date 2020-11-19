import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from '../board.model';
import { Column } from '../column.model';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  board: Board = new Board('Test board', [
    new Column('Ideas', [
      "First idea",
      "Second idea",
      "Third idea",
      "Fourth idea",
      "Fifth idea",
    ]),
    new Column('Resarch', [
      "First resarch",
      "Second resarch",
      "Third resarch",
      "Fourth resarch",
      "Fifth resarch",
    ]),
    new Column('Todo', [
      "First todo",
      "Second todo",
      "Third todo",
      "Fourth todo",
      "Fifth todo",
    ]),
    new Column('Done', [
      "First done",
      "Second done",
      "Third done",
      "Fourth done",
      "Fifth done",
    ])
  ])

  constructor() { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
