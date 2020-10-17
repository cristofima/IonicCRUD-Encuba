import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/Models/Note';
import { NoteService } from '../../Services/note.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  notes: Note[] = [];
  isLoaded = false;

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.doRefresh();
    this.initEvents();
  }

  doRefresh($event?: any){
    this.noteService.getNotes().subscribe(res => {
      this.notes = res;
      this.isLoaded = true;

      if($event){
        $event.target.complete();
      }
    });
  }

  private initEvents(){
    this.noteService.onSaveSuccess.subscribe(res =>{
      if(res){
        const index = this.notes.findIndex(x => x.noteId == res.noteId);
        if(index >= 0){
          this.notes[index].title = res.title;
        }else{
          this.notes.push(res);
        }
      }
    });

    this.noteService.onDeleteSuccess.subscribe(noteId =>{
      if(noteId){
        this.notes = this.notes.filter(x => x.noteId != noteId);
      }
    });
  }

}
