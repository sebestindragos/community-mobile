import { Component, OnInit } from '@angular/core';
import { NotesService } from '~/app/core/notes.service';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

@Component({
  selector: 'selector-name',
  templateUrl: 'add-note-modal.component.html'
})
export class AddNoteModalComponent implements OnInit {
  public title = "";
  public text = "";

  /**
   * Class constructor.
   */
  constructor (
    private _notes: NotesService,
    private params: ModalDialogParams
  ) { }

  ngOnInit () { }

  add () {
    this._notes.add({
      id: Date.now(),
      title: this.title,
      text: this.text,
    });
    console.log(this.title);
    this.params.closeCallback();
  }
}
