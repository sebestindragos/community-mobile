import { Component, OnInit } from "@angular/core";
import { NotesService } from "~/app/core/notes.service";
import { ActivatedRoute } from "@angular/router";
import { take } from "rxjs/operators";

interface INote {
  title: string,
  text: string
};

@Component({
  moduleId: module.id,
  templateUrl: "./page.component.html",
  styleUrls: [
    "./page.component.css"
  ]
})
export class NoteDetailsPageComponent implements OnInit {
  public title = "Note Details";
  public noteText = "";

  /**
   * Class constructor.
   */
  constructor (
    private _notesService: NotesService,
    private _activeRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    const noteId = parseInt(this._activeRoute.snapshot.params['id']);
    this._notesService.notes$.pipe(take(1)).subscribe((allNotes) => {
      allNotes.forEach(n => {
        if (n.id === noteId) {
          this.title = n.title;
          this.noteText = n.text;
        }
      });
    });
  }
}
