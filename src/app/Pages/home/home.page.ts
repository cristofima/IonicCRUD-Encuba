import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { OptionsComponent } from 'src/app/Components/options/options.component';
import { Note } from 'src/app/Models/Note';
import { LoadingService } from 'src/app/Services/loading.service';
import { MessageService } from 'src/app/Services/message.service';
import { NoteService } from '../../Services/note.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  notes: Note[] = [];
  isLoaded = false;

  constructor(
    private messageService: MessageService,
    private loadingService: LoadingService, 
    private noteService: NoteService, 
    private popoverController: PopoverController) { }

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

  async deleteNote(note: Note){
    const loading = await this.loadingService.presentLoading('Eliminando ...');
    await loading.present();

    this.noteService.deleteNote(note.noteId).subscribe(()=>{
      loading.dismiss();
      this.noteService.emitDeleteSuccess(note.noteId);
      this.messageService.presentToast(`Nota "${note.title}" eliminada`);
    }, ()=>{
      loading.dismiss();
      this.messageService.presentAlert('Error', 'Hubo un problema al eliminar. Por favor intente de nuevo');
    });
  }

}
