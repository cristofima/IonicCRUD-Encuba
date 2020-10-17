import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaveNotePage } from './save-note.page';

const routes: Routes = [
  {
    path: '',
    component: SaveNotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaveNotePageRoutingModule {}
