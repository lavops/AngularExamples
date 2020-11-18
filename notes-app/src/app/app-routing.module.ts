import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NotesListComponent } from './notes-list/notes-list.component';

const routes: Routes = [
  { path: '', component: MainLayoutComponent, children: [
    { path: '', component: NotesListComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }