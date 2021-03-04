import { Component, OnInit, EventEmitter, Output, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css'],
  //encapsulation: ViewEncapsulation.None
})
export class CockpitComponent implements OnInit {

  @Output('serverCreated') serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output('blueprintCreated') blueprintCreated = new EventEmitter<{blueprintName: string, blueprintContent: string}>();;
  // newServerName = '';
  newServerContent = '';
  @ViewChild('serverContentInput') serverContentInput: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer(serverNameInput: HTMLInputElement) {
    this.serverCreated.emit({serverName: serverNameInput.value, serverContent: this.serverContentInput.nativeElement.value});
  }

  onAddBlueprint(serverNameInput: HTMLInputElement) {
    this.blueprintCreated.emit({blueprintName: serverNameInput.value, blueprintContent: this.serverContentInput.nativeElement.value});
  }
}
