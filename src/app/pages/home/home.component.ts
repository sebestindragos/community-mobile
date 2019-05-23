import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { INote, NotesService } from "~/app/core/notes.service";
import { Observable } from "rxjs";
import { AddNoteModalComponent } from "./add-note-modal.component";

@Component({
  selector: "Home",
  moduleId: module.id,
  templateUrl: "./home.component.html",
  styleUrls: [
    "./home.component.css"
  ]
})
export class HomePageComponent implements OnInit {
  public notes$: Observable<INote[]>;

  /**
   * Class constructor.
   */
  constructor (
    private _notesService: NotesService,
    private _modalService: ModalDialogService,
    private _viewContainerRef: ViewContainerRef
  ) {
    this.notes$ = this._notesService.notes$;
  }

  ngOnInit(): void {
    // Init your component properties here.
  }

  /**
   * Add a new note.
   */
  addNote () {
    let options: ModalDialogOptions = {
      viewContainerRef: this._viewContainerRef,
      fullscreen: true
    };

    this._modalService.showModal(AddNoteModalComponent, options);
  }

  /**
   * Delete a note by id.
   */
  delete (noteId: number) {
    this._notesService.delete(noteId);
  }
}
