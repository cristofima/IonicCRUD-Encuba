import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaveNotePageRoutingModule } from './save-note-routing.module';

import { SaveNotePage } from './save-note.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SaveNotePageRoutingModule
  ],
  declarations: [SaveNotePage]
})
export class SaveNotePageModule {}
