import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  @Input('title') title: string;
  @Input('body') body: string;

  //MORA STATIC SAD SA VIEWCHILD
  @ViewChild('truncator', {static: true}) truncator: ElementRef<HTMLElement>;
  @ViewChild('bodyText', {static: true}) bodyText: ElementRef<HTMLElement>;

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    let style = window.getComputedStyle(this.bodyText.nativeElement, null);
    let viewableHeight = parseInt(style.getPropertyValue("height"), 10);

    //NE RADI OVO NESTO
    if(this.bodyText.nativeElement.scrollHeight > viewableHeight) {
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    }
    else{
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
    }
  }

}
