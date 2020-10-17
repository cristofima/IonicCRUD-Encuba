import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Note } from '../Models/Note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  // Para guardar
  private onSaveSuccessSubject = new Subject<Note>();
  public onSaveSuccess = this.onSaveSuccessSubject.asObservable();

  // Para eliminar
  private onDeleteSuccessSubject = new Subject<number>();
  public onDeleteSuccess = this.onDeleteSuccessSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  emitSaveSuccess(note: Note){
    this.onSaveSuccessSubject.next(note);
  }

  emitDeleteSuccess(noteId: number){
    this.onDeleteSuccessSubject.next(noteId);
  }

  getNotes() {
    return this.httpClient.get<Array<Note>>(environment.baseUrl + "/api/Notes");
  }

  getNote(noteId: number) {
    return this.httpClient.get<Note>(environment.baseUrl + "/api/Notes/" + noteId);
  }

  saveNote(note: Note) {
    return this.httpClient.post<Note>(environment.baseUrl + "/api/Notes", note);
  }

  deleteNote(noteId: number) {
    return this.httpClient.delete(environment.baseUrl + "/api/Notes/" + noteId);
  }
}
