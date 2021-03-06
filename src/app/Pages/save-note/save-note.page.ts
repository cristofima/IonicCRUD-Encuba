import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../Services/note.service';
import { Note } from '../../Models/Note';

import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, Platform } from '@ionic/angular';
import { MessageService } from '../../Services/message.service';
import { LoadingService } from '../../Services/loading.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-save-note',
  templateUrl: './save-note.page.html',
  styleUrls: ['./save-note.page.scss'],
})
export class SaveNotePage implements OnInit {

  note: Note;

  formGroup: FormGroup;

  isMobileWeb = true;

  constructor(
    private nativeStorage: NativeStorage,
    private platform: Platform,
    private datePicker: DatePicker,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private navController: NavController,
    private formBuilder: FormBuilder,
    private actRoute: ActivatedRoute,
    private noteService: NoteService) { }

  ngOnInit() {
    const params = this.actRoute.snapshot.params;

    this.isMobileWeb = this.platform.is("mobileweb");

    this.formGroup = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      isCompleted: new FormControl(false, Validators.required),
      priority: new FormControl(null, Validators.required),
      expirationDate: new FormControl(null, Validators.required)
    });

    if (params && params.id) {
      this.noteService.getNote(params.id).subscribe(res => {
        if (res) {
          this.note = res;

          this.formGroup.controls['title'].setValue(this.note.title);
          this.formGroup.controls['description'].setValue(this.note.description);
          this.formGroup.controls['isCompleted'].setValue(this.note.isCompleted);
          this.formGroup.controls['priority'].setValue(this.note.priority.toString());
          this.formGroup.controls['expirationDate'].setValue(this.note.expirationDate);
        }else{
          this.note = new Note();
        }
      });
    } else {
      this.note = new Note();
    }
  }

  async onSubmit(){
    const loading = await this.loadingService.presentLoading('Guardando ...');
    await loading.present();

    this.note.description = this.formGroup.controls['description'].value;
    this.note.title = this.formGroup.controls['title'].value;
    this.note.isCompleted = this.formGroup.controls['isCompleted'].value;
    this.note.priority = Number(this.formGroup.controls['priority'].value);
    this.note.expirationDate = this.formGroup.controls['expirationDate'].value;

    this.noteService.saveNote(this.note).subscribe(res =>{
      loading.dismiss();
      if(res){
        this.noteService.emitSaveSuccess(res);
        this.messageService.presentToast('Nota guardada');
        this.navController.back();
      }
    }, () => {
      loading.dismiss();
      this.messageService.presentAlert('Error', 'Hubo un problema al guardar. Por favor intente de nuevo.');
    }); 
  }

  async deleteNote(){
    const loading = await this.loadingService.presentLoading('Eliminando ...');
    await loading.present();

    this.noteService.deleteNote(this.note.noteId).subscribe(()=>{
      loading.dismiss();
      this.noteService.emitDeleteSuccess(this.note.noteId);
      this.messageService.presentToast('Nota eliminada');
      this.navController.back();
    }, ()=>{
      loading.dismiss();
      this.messageService.presentAlert('Error', 'Hubo un problema al eliminar. Por favor intente de nuevo');
    });
  }

  openDatePicker(){
    if(!this.isMobileWeb){
      let expirationDate = new Date();

      if(this.formGroup.controls["expirationDate"].value){
        expirationDate = new Date(this.formGroup.controls["expirationDate"].value);
      }

      let androidTheme = this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT;

      const openDT = ()=>{
        this.datePicker.show({
          date: expirationDate,
          mode: 'date',
          androidTheme: androidTheme
        }).then(
          date => {
            if(date){
              this.formGroup.controls["expirationDate"].setValue(date.toISOString());
            }
          }
        );
      };

      this.nativeStorage.getItem('theme').then((theme: string) =>{
        if(theme == "dark"){
          androidTheme = this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_DARK;
        }
        
        openDT();
      });
    }
  }

}
