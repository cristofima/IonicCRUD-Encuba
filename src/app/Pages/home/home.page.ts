import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { OptionsComponent } from 'src/app/Components/options/options.component';
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

  constructor(private noteService: NoteService, private popoverController: PopoverController) { }

  ngOnInit(): void {
    this.doRefresh();
    this.initEvents();
  }

  async showPopover($event) {
    const popover = await this.popoverController.create({
      component: OptionsComponent,
      event: $event,
      translucent: true
    });

    return await popover.present();
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
