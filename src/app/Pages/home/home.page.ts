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
  isDarkTheme = false;

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.checkTheme();
    this.doRefresh();
    this.initEvents();
  }

  private checkTheme(){
    let theme = localStorage.getItem("theme");

    if(theme && theme == "dark"){
      this.isDarkTheme = true;
    }
  }

  changeTheme($event){
    if($event.detail.checked){
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem("theme", "dark");
    }
    else{
      document.body.setAttribute('data-theme', 'light');
      localStorage.setItem("theme", "light");
    }
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
