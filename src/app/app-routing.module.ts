import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./Pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'save-note',
    loadChildren: () => import('./Pages/save-note/save-note.module').then(m => m.SaveNotePageModule)
  },
  {
    path: 'save-note/:id',
    loadChildren: () => import('./Pages/save-note/save-note.module').then(m => m.SaveNotePageModule)
  },  {
    path: 'settings',
    loadChildren: () => import('./Pages/settings/settings.module').then( m => m.SettingsPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
