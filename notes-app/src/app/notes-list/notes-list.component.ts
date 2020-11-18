import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NoteDetailsComponent } from '../note-details/note-details.component';
import { Note } from '../note.model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [
    trigger('itemAnim', [
      transition('void => *', [
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          'margin-bottom': 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
        }),
        animate('50ms', style({
          height: '*',
          'margin-bottom': '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingLeft: '*',
          paddingRight: '*',
        })),
        animate(200)
      ]),
      transition('* => void', [
        animate(50, style({
          transform: 'scale(1.05)'
        })),
        animate(50, style({
          transform: 'scale(1)',
          opacity: 0.75
        })),
        animate('120ms ease-out', style({
          transform: 'scale(0.68)',
          opacity: 0
        })),
        animate('150ms ease-out', style({
          height: 0,
          'margin-bottom': 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
        }))
      ])
    ]),
    trigger('listAnim', [
      transition('* => *', [
        query(':enter', [
          style({
            opacity: 0,
            height: 0,
          }),
          stagger(200, [
            animate('0.2s ease')
          ])
        ], {
          optional: true
        })
      ])
    ])
  ]
})
export class NotesListComponent implements OnInit {

  notes: Note[] = new Array<Note>();
  filteredNotes: Note[] = new Array<Note>();
  @ViewChild('filterInput') filterInputElRef: ElementRef<HTMLInputElement>;

  constructor(
    private noteService: NotesService
  ) { }

  ngOnInit(): void {

    this.notes = this.noteService.getAll();
    //this.filteredNotes = this.noteService.getAll();
    this.filter('');
  }

  deleteNote(note: Note) {

    let id = this.noteService.getId(note);
    this.noteService.delete(id);
    this.filter(this.filterInputElRef.nativeElement.value);
  }

  generateNoteURL(note: Note) {

    let id = this.noteService.getId(note);
    return id;
  }

  filter(query: string) {

    query = query.toLowerCase().trim();
    let allResults: Note[] = new Array<Note>();

    let terms: string[] = query.split(' ');
    terms = this.removeDuplicates(terms);

    terms.forEach(term => {
      let results: Note[] = this.relevantNotes(term);
      allResults = [...allResults, ...results];
    })

    let uniqueResults = this.removeDuplicates(allResults);
    this.filteredNotes = uniqueResults;

    this.sortByRelevancy(allResults);
  }

  removeDuplicates(arr: Array<any>): Array<any> {

    let uniqueResults: Set<any> = new Set<any>();
    arr.forEach(e => uniqueResults.add(e));

    return Array.from(uniqueResults);
  }

  relevantNotes(query: string): Array<Note> {

    query = query.toLowerCase().trim();
    let relevantNotes = this.notes.filter(note => {
      if(note.body.toLowerCase().includes(query) || note.title.toLowerCase().includes(query)) {
        return true;
      }
      
      return false;
    })

    return relevantNotes;
  }

  sortByRelevancy(searchResults: Note[]) {

    let noteCountObj: Object = {};

    searchResults.forEach(note => {
      let noteId = this.noteService.getId(note);

      if(noteCountObj[noteId]) {
        noteCountObj[noteId] += 1;
      }
      else {
        noteCountObj[noteId] = 1;
      }

      this.filteredNotes = this.filteredNotes.sort((a: Note, b: Note) => {
        let aId = this.noteService.getId(a);
        let bId = this.noteService.getId(b);

        let aCount = noteCountObj[aId];
        let bCount = noteCountObj[bId];

        return bCount - aCount;
      })
    })
  }
}
